import express from "express";
import publicRoutes from "@/routes/public.routes";
import adminRoutes from "@/routes/admin.routes";
const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("hello world")
})


app.use("/api", publicRoutes);
app.use("/api/admin", adminRoutes);

export default app;
