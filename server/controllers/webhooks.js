import { Webhook } from "svix";
import User from "../models/user.js";

// API controller function to manage Clerk user with DB
export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers[svix-id],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature" : req.headers["svix-signature"]
        })

        const {data, type} = req.body

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id:data.id,
                    email: data.email_addressses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                }
                await User.create(userData)
                res.json({})
                break;
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addressses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id)
                res.json({})
            }
            default :
            break;
               
        }
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: "Webhooks error"})
    }
}