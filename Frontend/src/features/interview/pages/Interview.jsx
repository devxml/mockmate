import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { motion } from "framer-motion"
import {
  Code2,
  MessageSquare,
  Map,
  Download,
  BarChart3,
  AlertTriangle,
} from "lucide-react"
import { useInterview } from "../hooks/useInterview.js"
import { AppShell } from "../../../components/layout/AppShell"
import { Button } from "../../../components/ui/Button"
import { Badge } from "../../../components/ui/Badge"
import { ProgressRing } from "../../../components/ui/ProgressRing"
import { SkillGapList } from "../../../components/ui/SkillGapList"
import { LoadingScreen } from "../../../components/ui/LoadingScreen"
import { QuestionCard } from "../components/QuestionCard"
import { RoadmapDay } from "../components/RoadmapDay"
import { cn } from "../../../lib/cn"

const NAV_ITEMS = [
  { id: "technical", label: "Technical", icon: Code2, countKey: "technicalQuestions" },
  { id: "behavioral", label: "Behavioral", icon: MessageSquare, countKey: "behavioralQuestions" },
  { id: "roadmap", label: "Roadmap", icon: Map, countKey: "preparationPlan" },
]

const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical")
  const { report, getReportById, loading, getResumePdf } = useInterview()
  const { interviewId } = useParams()

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId)
    }
  }, [interviewId])

  if (loading || !report) {
    return <LoadingScreen message="Loading your interview plan..." />
  }

  const activeItem = NAV_ITEMS.find((n) => n.id === activeNav)
  const count =
    activeNav === "roadmap"
      ? `${report.preparationPlan.length}-day plan`
      : `${report[activeItem.countKey].length} questions`

  return (
    <AppShell showBack>
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-3rem)]">
        {/* Section nav */}
        <nav className="lg:w-52 shrink-0 border-b lg:border-b-0 lg:border-r border-zinc-800/80 p-3 lg:p-4 space-y-1">
          <p className="hidden lg:block px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
            Sections
          </p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const active = activeNav === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveNav(item.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-violet-500/10 text-violet-400"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </button>
            )
          })}
          <div className="pt-3 hidden lg:block">
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              icon={Download}
              onClick={() => getResumePdf(interviewId)}
            >
              Download Resume
            </Button>
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <motion.div
            key={activeNav}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-zinc-100">
                  {activeNav === "technical" && "Technical Questions"}
                  {activeNav === "behavioral" && "Behavioral Questions"}
                  {activeNav === "roadmap" && "Preparation Roadmap"}
                </h2>
                {report.title && (
                  <p className="text-sm text-zinc-500 mt-0.5">{report.title}</p>
                )}
              </div>
              <Badge>{count}</Badge>
            </div>

            {activeNav === "technical" && (
              <div className="space-y-3">
                {report.technicalQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            )}

            {activeNav === "behavioral" && (
              <div className="space-y-3">
                {report.behavioralQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            )}

            {activeNav === "roadmap" && (
              <div className="max-w-2xl">
                {report.preparationPlan.map((day, i) => (
                  <RoadmapDay key={day.day} day={day} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        </main>

        {/* Insights sidebar */}
        <aside className="lg:w-72 shrink-0 border-t lg:border-t-0 lg:border-l border-zinc-800/80 p-4 sm:p-6 space-y-6 bg-surface-raised/50">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="size-4 text-violet-400" />
              <h3 className="text-sm font-semibold text-zinc-300">Match Score</h3>
            </div>
            <ProgressRing score={report.matchScore} />
          </div>

          <div className="h-px bg-zinc-800" />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="size-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-zinc-300">Skill Gaps</h3>
              <Badge variant="default" className="ml-auto normal-case tracking-normal">
                {report.skillGaps.length}
              </Badge>
            </div>
            <SkillGapList gaps={report.skillGaps} />
          </div>

          <div className="lg:hidden">
            <Button
              variant="secondary"
              className="w-full"
              icon={Download}
              onClick={() => getResumePdf(interviewId)}
            >
              Download Resume
            </Button>
          </div>
        </aside>
      </div>
    </AppShell>
  )
}

export default Interview
