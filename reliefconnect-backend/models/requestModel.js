import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },

},
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
export default Request;
