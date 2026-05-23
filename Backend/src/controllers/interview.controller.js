const pdfParse = require("pdf-parse")

const {
    generateInterviewReport,
    generateResumePdf
} = require("../services/ai.service")

const interviewReportModel =
    require("../models/interviewReport.model")



/**
 * @description Controller to generate interview report
 */
async function generateInterViewReportController(
    req,
    res
) {

    try {

        // check pdf upload
        if (!req.file) {
            return res.status(400).json({
                message: "Resume PDF is required"
            })
        }

        // parse pdf
        const resumeContent = await pdfParse(
            req.file.buffer
        )

        const {
            selfDescription,
            jobDescription
        } = req.body

        // generate report using AI
const interViewReportByAi =
    await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

console.log(interViewReportByAi)


// fallback title
if (!interViewReportByAi.title) {
    interViewReportByAi.title =
        "Software Engineer"
}


// technicalQuestions cleanup
if (
    !Array.isArray(
        interViewReportByAi.technicalQuestions
    )
) {
    interViewReportByAi.technicalQuestions = []
}

interViewReportByAi.technicalQuestions =
    interViewReportByAi.technicalQuestions.map(
        (item) => {

            // if AI returned string or number
            if (
                typeof item === "string" ||
                typeof item === "number"
            ) {

                return {
                    question: String(item),
                    intention:
                        "Understand candidate knowledge",
                    answer:
                        "Explain clearly with examples"
                }
            }

            return {
                question:
                    item.question || "Question",
                intention:
                    item.intention || "Not provided",
                answer:
                    item.answer || "Not provided"
            }
        }
    )



// behavioralQuestions cleanup
if (
    !Array.isArray(
        interViewReportByAi.behavioralQuestions
    )
) {
    interViewReportByAi.behavioralQuestions = []
}

interViewReportByAi.behavioralQuestions =
    interViewReportByAi.behavioralQuestions.map(
        (item) => {

            if (
                typeof item === "string" ||
                typeof item === "number"
            ) {

                return {
                    question: String(item),
                    intention:
                        "Evaluate communication",
                    answer:
                        "Use STAR method"
                }
            }

            return {
                question:
                    item.question || "Question",
                intention:
                    item.intention || "Not provided",
                answer:
                    item.answer || "Not provided"
            }
        }
    )




// skillGaps cleanup
if (
    !Array.isArray(interViewReportByAi.skillGaps)
) {
    interViewReportByAi.skillGaps = []
}

interViewReportByAi.skillGaps =
    interViewReportByAi.skillGaps.map(
        (item) => {

            if (
                typeof item === "string"
            ) {

                return {
                    skill: item,
                    severity: "medium"
                }
            }

            return {
                skill:
                    item.skill || "Unknown skill",
                severity:
                    item.severity || "medium"
            }
        }
    )




// preparationPlan cleanup
if (
    !Array.isArray(
        interViewReportByAi.preparationPlan
    )
) {
    interViewReportByAi.preparationPlan = []
}

interViewReportByAi.preparationPlan =
    interViewReportByAi.preparationPlan.map(
        (item, index) => {

            if (
                typeof item === "string"
            ) {

                return {
                    day: index + 1,
                    focus: item,
                    tasks: [item]
                }
            }

            return {
                day:
                    item.day || index + 1,
                focus:
                    item.focus || "Interview Prep",
                tasks:
                    item.tasks || []
            }
        }
    )

console.log(interViewReportByAi)

        // save in database
        const interviewReport =
            await interviewReportModel.create({
                user: req.user.id,
                resume: resumeContent.text,
                selfDescription,
                jobDescription,
                ...interViewReportByAi
            })

        res.status(201).json({
            message:
                "Interview report generated successfully.",
            interviewReport
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message:
                "Failed to generate interview report",
            error: error.message
        })
    }
}



/**
 * @description Get interview report by id
 */
async function getInterviewReportByIdController(
    req,
    res
) {

    try {

        const { interviewId } = req.params

        const interviewReport =
            await interviewReportModel.findOne({
                _id: interviewId,
                user: req.user.id
            })

        if (!interviewReport) {
            return res.status(404).json({
                message:
                    "Interview report not found."
            })
        }

        res.status(200).json({
            message:
                "Interview report fetched successfully.",
            interviewReport
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message:
                "Failed to fetch interview report",
            error: error.message
        })
    }
}



/**
 * @description Get all interview reports
 */
async function getAllInterviewReportsController(
    req,
    res
) {

    try {

        const interviewReports =
            await interviewReportModel
                .find({ user: req.user.id })
                .sort({ createdAt: -1 })
                .select(`
                    -resume
                    -selfDescription
                    -jobDescription
                    -__v
                    -technicalQuestions
                    -behavioralQuestions
                    -skillGaps
                    -preparationPlan
                `)

        res.status(200).json({
            message:
                "Interview reports fetched successfully.",
            interviewReports
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message:
                "Failed to fetch interview reports",
            error: error.message
        })
    }
}



/**
 * @description Generate resume PDF
 */
async function generateResumePdfController(
    req,
    res
) {

    try {

        const { interviewReportId } = req.params

        const interviewReport =
            await interviewReportModel.findById(
                interviewReportId
            )

        if (!interviewReport) {
            return res.status(404).json({
                message:
                    "Interview report not found."
            })
        }

        const {
            resume,
            jobDescription,
            selfDescription
        } = interviewReport

        const pdfBuffer =
            await generateResumePdf({
                resume,
                jobDescription,
                selfDescription
            })

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition":
                `attachment; filename=resume_${interviewReportId}.pdf`
        })

        res.send(pdfBuffer)

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message:
                "Failed to generate resume PDF",
            error: error.message
        })
    }
}



module.exports = {
    generateInterViewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
}