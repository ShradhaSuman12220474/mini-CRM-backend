import audiencePreviewService from "../services/audiencePreviewService.js";

export async function audiencePreviewController(req, res){
    console.log("Request body:", req.body);
    try {
        const  rule  = req.body.rule;
        // console.log(rule);
        if (!rule || typeof rule !== 'string') {
            return res.status(400).json({ error: "Invalid rule format" });
        }

        

        const audience = await audiencePreviewService(rule);

    return res.json({ audienceDetails : audience });
    }
     catch (err) {
        console.error("Error in preview controller:", err);
        return res.status(500).json({ error: "Failed to preview audience" });
    }

}

