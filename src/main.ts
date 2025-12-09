import express from "express"
import { PORT } from "./utils/env-util"
import { publicRouter } from "./routes/public-api"
import { privateRouter } from "./routes/private-api"

const app = express()

app.use(express.json())
app.use("/api", publicRouter)
app.use("/api", privateRouter)
app.listen(PORT || 3000, () => {
    console.log(`Server is running on port ${PORT || 3000}`)
})