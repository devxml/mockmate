import { useState, useRef } from "react"
import { useNavigate } from "react-router"
import { motion } from "framer-motion"
import { Briefcase, User, Upload, Sparkles, Clock, FileText } from "lucide-react"
import { useInterview } from "../hooks/useInterview.js"
import { AppShell } from "../../../components/layout/AppShell"
import { Card, CardBody, CardFooter } from "../../../components/ui/Card"
import { Badge } from "../../../components/ui/Badge"
import { Textarea } from "../../../components/ui/Textarea"
import { Button } from "../../../components/ui/Button"
import { LoadingScreen } from "../../../components/ui/LoadingScreen"
import { ReportCard } from "../components/ReportCard"
import { cn } from "../../../lib/cn"

const Home = () => {
  const { loading, generateReport, reports } = useInterview()
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const [resumeFileName, setResumeFileName] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const resumeInputRef = useRef()
  const navigate = useNavigate()

  const handleGenerateReport = async () => {
    setErrorMessage("")
    const resumeFile = resumeInputRef.current?.files?.[0]

    if (!jobDescription.trim()) {
      setErrorMessage("Please paste the job description before generating the report.")
      return
    }

    if (!resumeFile) {
      setErrorMessage("Please upload your resume as a PDF file.")
      return
    }

    if (resumeFile.type !== "application/pdf") {
      setErrorMessage("Only PDF resumes are supported right now.")
      return
    }

    try {
      const data = await generateReport({ jobDescription, selfDescription, resumeFile })

      if (!data?._id) {
        setErrorMessage("The report was generated but no report ID was returned.")
        return
      }

      navigate(`/interview/${data._id}`)
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to generate the report. Please try again."
      setErrorMessage(message)
    }
  }

  const handleFile = (file) => {
    if (file) {
      setResumeFileName(file.name)
      const dt = new DataTransfer()
      dt.items.add(file)
      resumeInputRef.current.files = dt.files
    }
  }

  if (loading && !reports.length) {
    return <LoadingScreen message="Loading your interview plans..." />
  }

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 lg:py-10 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            Create interview plan
          </h1>
          <p className="text-sm text-zinc-400 max-w-xl">
            Paste a job description and upload your resume. Our AI builds a personalized strategy in ~30 seconds.
          </p>
        </motion.div>

        {/* Main form card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="overflow-hidden">
            <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
              {/* Job description */}
              <CardBody className="flex flex-col min-h-[380px]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="size-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                    <Briefcase className="size-4 text-violet-400" />
                  </div>
                  <h2 className="text-sm font-semibold text-zinc-200">Target Job Description</h2>
                  <Badge variant="required">Required</Badge>
                </div>
                <Textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here…"
                  maxLength={5000}
                  className="min-h-[280px]"
                />
              </CardBody>

              {/* Profile */}
              <CardBody className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <User className="size-4 text-indigo-400" />
                  </div>
                  <h2 className="text-sm font-semibold text-zinc-200">Your Profile</h2>
                </div>

                {/* Resume upload */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-zinc-300">Upload Resume</span>
                    <Badge variant="accent">Best Results</Badge>
                  </div>
                  <label
                    htmlFor="resume"
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault()
                      setIsDragging(false)
                      handleFile(e.dataTransfer.files[0])
                    }}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all",
                      isDragging
                        ? "border-violet-500 bg-violet-500/5"
                        : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900/80"
                    )}
                  >
                    <Upload className="size-6 text-zinc-500" />
                    <p className="text-sm font-medium text-zinc-300">
                      {resumeFileName || "Click or drag & drop"}
                    </p>
                    <p className="text-xs text-zinc-600">PDF only · Max 5MB</p>
                    <input
                      ref={resumeInputRef}
                      hidden
                      type="file"
                      id="resume"
                      name="resume"
                      accept="application/pdf,.pdf"
                      onChange={(e) => setResumeFileName(e.target.files[0]?.name || "")}
                    />
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-zinc-800" />
                  <span className="text-xs text-zinc-600 font-medium">OR</span>
                  <div className="flex-1 h-px bg-zinc-800" />
                </div>

                <Textarea
                  label="Quick Self-Description"
                  id="selfDescription"
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  placeholder="Briefly describe your experience and key skills…"
                  className="min-h-[80px]"
                />

                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-blue-500/5 border border-blue-500/15">
                  <FileText className="size-4 text-blue-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-blue-300/80 leading-relaxed">
                    Either a <strong className="text-blue-200">Resume</strong> or a{" "}
                    <strong className="text-blue-200">Self Description</strong> is required.
                  </p>
                </div>
              </CardBody>
            </div>

            <CardFooter>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Clock className="size-3.5" />
                AI-powered · ~30 seconds
              </div>
              <Button onClick={handleGenerateReport} disabled={loading} icon={Sparkles} size="lg">
                {loading ? "Generating…" : "Generate Strategy"}
              </Button>
            </CardFooter>
          </Card>

          {errorMessage && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 px-4 py-3 rounded-lg text-sm text-red-400 bg-red-500/10 border border-red-500/20"
              role="alert"
            >
              {errorMessage}
            </motion.p>
          )}
        </motion.div>

        {/* Recent reports */}
        {reports.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-zinc-200">Recent Plans</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {reports.map((report, i) => (
                <ReportCard
                  key={report._id}
                  report={report}
                  index={i}
                  onClick={() => navigate(`/interview/${report._id}`)}
                />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </AppShell>
  )
}

export default Home
