const BroadcastSchema = {
    nama: {
      prop: "nama",
      type: String,
      required: true,
    },
    no_telp: {
      prop: "number",
      type: String,
      required: true,
    },
  }
const PayrollSchema = {
    nama: {
      prop: "nama",
      type: String,
      required: true,
    },
  }

const BlastSchema = {
    nama: {
      prop: "nama",
      type: String,
      required: true,
    },
    number: {
      prop: "number",
      type: String,
      required: true,
    },
    KSM: {
      prop: "KSM",
      type: Number,
      required: true,
    },
    KPR: {
      prop: "KPR",
      type: Number,
      required: true,
    },
    CC: {
      prop: "CC",
      type: Number,
      required: true,
    },
    MTR: {
      prop: "MTR",
      type: Number,
      required: true,
    },
    DEPOSITO: {
      prop: "DEPOSITO",
      type: Number,
      required: true,
    },
  }

export {BroadcastSchema, BlastSchema}