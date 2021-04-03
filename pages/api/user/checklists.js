import { connectToDatabase } from "../../../util/mongodb";
import { getSession } from 'next-auth/client'

/**
 * Method to standardize creating text
 * @param {string} text
 * @param {boolean} isComplete
 * @param {number} minTimeFromTarget  
 * @param {number} maxTimeFromTarget  
 */


// POST request to this route to add an empty checklist item
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const session = await getSession({ req });


  if(!db){
    res.status(400).send({message: "No db connection"});
    return;
  }

  if(!session){
    res.status(400).send({message: "User is not logged in"});
    return;
  }


  // Extract email from session
  const {user: {email}} = session;

  console.log(email);

  if(req.method == "GET"){
    const checklists = await db
    .collection("users")
    .findOne({email: email});
  
    res.status(200).json(checklists);
    return;

  }


  res.status(400).send({message: "Got to an unreachable point in checklists api route"});
  return;

//   // Grab post parameters
//   const {name, targetDate, items} = req.body;

//   // find if there is a checklist 
//   const filter = {name};
//   const replacement = {
//       name,
//       targetDate, 
//       items
//   }

//   // 
//   const options = {
//       upsert: true;
//   }


//   const result = await db
//     .collection("emptyChecklists")
//     .replaceOne(filter, replacement, options);
  
//     res.json(result);
};


