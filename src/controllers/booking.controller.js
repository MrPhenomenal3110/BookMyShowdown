import { Stripe } from "stripe";
import { Booking } from "../models/booking.model.js";
import { Show } from "../models/show.model.js";
import EmailHelper from "../utils/emailSender.util.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const webhook = (request, response) => {
    console.log('Webhook Called')
    const sig = request.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_ENDPOINT_SECRET);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            handlePaymentIntentSucceeded(paymentIntent);
            break;
    default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.send();
};

async function handlePaymentIntentSucceeded(paymentIntent) {
    console.log('Succesfull')
    console.log(paymentIntent)
}

export const makePayment = async (req, res) => {
    try {
        const { token, amount } = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            customer: customer.id,
            payment_method_types: ["card"],
            receipt_email: token.email,
            description: "Token has been assigned to the movie!",
        });

        const transactionId = paymentIntent.id;

        res.send({
            success: true,
            message: "Payment Successful! Ticket(s) booked!",
            data: transactionId,
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
}

export const bookShow = async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();

        const show = await Show.findById(req.body.show).populate("movie");
        const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
        await Show.findByIdAndUpdate(req.body.show, {
            bookedSeats: updatedBookedSeats,
        });

        const populatedBooking = await Booking.findById(newBooking._id).populate("user")
        .populate("show")
        .populate({
            path: "show",
            populate: {
                path: "movie",
                model: "Movie",
            },
        })
        .populate({
            path: "show",
            populate: {
                path: "theatre",
                model: "Theatre",
            },
        });


        console.log("this is populated Booking", populatedBooking);

        res.send({
            success: true,
            message: "New Booking done!",
            data: populatedBooking,
        });

        await EmailHelper("ticketTemplate.html", 'BOOKING CONFIRMED', populatedBooking.user.email, {
            name: populatedBooking.user.name,
            movie : populatedBooking.show.movie.title,
            theatre : populatedBooking.show.theatre.name,
            date:populatedBooking.show.date,
            time:populatedBooking.show.time,
            seats : populatedBooking.seats,
            amount : populatedBooking.seats.length * populatedBooking.show.ticketPrice,
            transactionId : populatedBooking.transactionId,
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
}

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({
            user: req.body.userId
        })
        .populate("user")
        .populate("show")
        .populate({
            path: "show",
            populate: {
                path: "movie",
                model: "Movie",
            },
        })
        .populate({
            path: "show",
            populate: {
                path: "theatre",
                model: "Theatre",
            },
        });

        res.send({
            success: true,
            message: "Bookings fetched!",
            data: bookings,
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
}