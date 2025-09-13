const mongoose = require("mongoose");

const RentLogSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
});

const TenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  aadhar_number: { type: String, required: true },
  phone: { type: String, required: true },
});

const AddressSchema = new mongoose.Schema({
  address_line: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
});

const PropertySchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: { type: String, required: true, unique: true },
  address: { type: AddressSchema, required: true },
  current_tenant: { type: TenantSchema, required: true },
  current_rent: { type: Number, default: null },
  rent_logs: { type: [RentLogSchema], default: [] },
});

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true ,unique: true},
    password: { type: String, required: true }, // store hashed password
    properties: { type: [PropertySchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
