//Middleware to check userId and hasPremiumPlan

import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    const { userId, has } = await req.auth();
    // const { userId } = getAuth(req)
   
      const user = await clerkClient.users.getUser(userId);

    const { hasPremiumPlan } = await has({ plan: 'free' });
     

    // console.log(user.raw.unsafe_metadata.plan);

    // const hasPremiumPlan= user.raw.unsafe_metadata.plan !== 'free'? true :false
    

    // console.log(hasPremiumPlan)

    if (!hasPremiumPlan && user.privateMetadata.free_usage) {
      req.free_usage = user.privateMetadata.free_usage;
    } else {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: 0,
        },
      });
      req.free_usage = 0;
    }
    req.plan = hasPremiumPlan ? "premium" : "free";
    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
