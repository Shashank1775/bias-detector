"use client";

import { useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  CATEGORIES,
  CATEGORY_META,
  MAX_TEXT_LENGTH,
  MIN_TEXT_LENGTH,
  type AnalysisContext,
  type AnalysisError,
  type AnalysisRequest,
  type AnalysisResult,
} from "@/lib/analysis";

type Status = "idle" | "loading" | "success" | "error";

export default function TextBoxDetector() {
  const [text, setText] = useState("");
  const [selectedType, setSelectedType] = useState("text");
  const [showPopup, setShowPopup] = useState(false);
  const [contextInfo, setContextInfo] = useState<Required<AnalysisContext>>({
    source: "",
    purpose: "",
    date: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const trimmedLength = text.trim().length;

  const handleAnalyze = () => {
    if (trimmedLength < MIN_TEXT_LENGTH) {
      setError(`Please enter at least ${MIN_TEXT_LENGTH} characters of text to analyse.`);
      setStatus("error");
      return;
    }
    if (trimmedLength > MAX_TEXT_LENGTH) {
      setError(`Text is too long (max ${MAX_TEXT_LENGTH.toLocaleString()} characters).`);
      setStatus("error");
      return;
    }
    setError(null);
    setShowPopup(true);
  };

  const confirmAnalysis = async () => {
    setShowPopup(false);
    setStatus("loading");
    setError(null);
    setResult(null);

    const payload: AnalysisRequest = { text, type: "text", context: contextInfo };

    try {
      const response = await fetch("/api/analyzeText", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // The API always returns JSON, but guard against proxies/500 pages that don't.
      const data = (await response.json().catch(() => null)) as AnalysisResult | AnalysisError | null;

      if (!response.ok || !data || "error" in data) {
        const message =
          data && "error" in data ? data.error : `Request failed with status ${response.status}.`;
        setError(message);
        setStatus("error");
        return;
      }

      setResult(data);
      setStatus("success");
    } catch (err) {
      console.error("Analysis request failed", err);
      setError("Could not reach the server. Check your connection and try again.");
      setStatus("error");
    }
  };

  /** Downloads the current result as a Markdown report via a Blob URL. */
  const handleDownloadReport = () => {
    if (!result) return;
    const blob = new Blob([buildMarkdownReport(text, contextInfo, result)], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `bias-report-${new Date().toISOString().slice(0, 10)}.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  // Map the four scores onto pie slices. Categories that scored 0 are dropped
  // so they don't clutter the legend; if everything is 0 there is nothing to
  // chart and we show a "clean" message instead.
  const pieData = result
    ? CATEGORIES.map((key) => ({
        name: CATEGORY_META[key].label,
        value: result[key],
        fill: CATEGORY_META[key].color,
      })).filter((slice) => slice.value > 0)
    : [];

  return (
    <div className="bg-gray-900 text-white w-screen p-6 min-h-screen flex space-x-6">
      <div className="w-2/3 min-h-[70vh] flex flex-col space-y-4 p-4 bg-gray-800 rounded-lg shadow-lg self-start">
        <Textarea
          className="flex-grow min-h-[50vh] p-4 border rounded-lg shadow-sm bg-gray-700 text-white"
          placeholder="Enter text for detection..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={status === "loading"}
        />
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>
            {trimmedLength.toLocaleString()} / {MAX_TEXT_LENGTH.toLocaleString()} characters
          </span>
          {status === "loading" && <span className="animate-pulse">Analysing with Claude...</span>}
        </div>
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60"
          onClick={handleAnalyze}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Analysing..." : "Analyze"}
        </Button>
        {status === "error" && error && (
          <div
            role="alert"
            className="rounded-md border border-red-500/60 bg-red-900/40 p-3 text-sm text-red-100"
          >
            {error}
          </div>
        )}
      </div>

      <div className="flex flex-col w-1/3 space-y-6">
        <Card className="bg-gray-800 text-white shadow-lg">
          <CardContent className="p-4 h-full flex flex-col">
            <p className="text-lg font-semibold mb-4">Options</p>
            <ToggleGroup
              type="single"
              value={selectedType}
              onValueChange={(value) => value && setSelectedType(value)}
              className="space-y-2 flex flex-col"
            >
              <ToggleGroupItem value="text" className="bg-gray-700 text-white">
                Text
              </ToggleGroupItem>
              <ToggleGroupItem value="video" disabled className="bg-gray-700 text-gray-400">
                Video (Coming Soon)
              </ToggleGroupItem>
              <ToggleGroupItem value="speech" disabled className="bg-gray-700 text-gray-400">
                Speech (Coming Soon)
              </ToggleGroupItem>
              <ToggleGroupItem value="photo" disabled className="bg-gray-700 text-gray-400">
                Photo (Coming Soon)
              </ToggleGroupItem>
            </ToggleGroup>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 text-white shadow-lg flex-grow">
          <CardContent className="p-4 h-full flex flex-col">
            <p className="text-lg font-semibold mb-4">Results</p>

            {status === "idle" && (
              <p className="text-sm text-gray-400">
                Paste some text on the left and press Analyze to see scores for bias, misinformation,
                hate speech, and stereotypes.
              </p>
            )}

            {status === "loading" && (
              <div className="flex flex-col items-center justify-center py-10 space-y-3">
                <div className="h-10 w-10 rounded-full border-4 border-gray-600 border-t-blue-400 animate-spin" />
                <p className="text-sm text-gray-300">Reading the text and scoring each category...</p>
              </div>
            )}

            {status === "error" && (
              <p className="text-sm text-gray-400">No results yet. Fix the error on the left and try again.</p>
            )}

            {status === "success" && result && (
              <div className="flex flex-col space-y-4">
                {pieData.length > 0 ? (
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={2}
                          isAnimationActive={false}
                        >
                          {pieData.map((slice) => (
                            <Cell key={slice.name} fill={slice.fill} stroke="#1f2937" />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value} / 100`, "Score"]}
                          contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151" }}
                          itemStyle={{ color: "#f9fafb" }}
                        />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <p className="text-center text-green-300 font-semibold py-4">
                    No bias, misinformation, hate speech, or stereotypes detected.
                  </p>
                )}

                <ul className="space-y-2 text-sm">
                  {CATEGORIES.map((key) => (
                    <li key={key} className="space-y-1">
                      <div className="flex justify-between">
                        <span>{CATEGORY_META[key].label}</span>
                        <span className="font-semibold">{result[key]}%</span>
                      </div>
                      <div className="h-2 w-full rounded bg-gray-700">
                        <div
                          className="h-2 rounded"
                          style={{ width: `${result[key]}%`, backgroundColor: CATEGORY_META[key].color }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>

                <div>
                  <p className="font-semibold mb-1">Summary</p>
                  <p className="text-sm text-gray-200 whitespace-pre-line">{result.summary}</p>
                </div>

                {result.highlights.length > 0 && (
                  <div>
                    <p className="font-semibold mb-2">Flagged passages</p>
                    <ul className="space-y-3">
                      {result.highlights.map((h, i) => (
                        <li key={i} className="rounded-md bg-gray-700/60 p-3 text-sm">
                          <span
                            className="inline-block rounded px-2 py-0.5 text-xs font-semibold text-gray-900 mb-2"
                            style={{ backgroundColor: CATEGORY_META[h.category].color }}
                          >
                            {CATEGORY_META[h.category].label}
                          </span>
                          <blockquote className="border-l-2 border-gray-500 pl-2 italic text-gray-100">
                            &ldquo;{h.quote}&rdquo;
                          </blockquote>
                          <p className="mt-1 text-gray-300">{h.explanation}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button className="mt-2 w-full bg-green-500 hover:bg-green-600" onClick={handleDownloadReport}>
                  Download Report (Markdown)
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Context Popup */}
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="bg-gray-800 text-white p-6 rounded-lg">
          <DialogHeader>
            <DialogTitle>Provide Context</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-300">
            Optional, but it helps the analysis: an opinion column is judged differently from a news
            report.
          </p>
          <Textarea
            className="bg-gray-700 text-white p-2 rounded"
            placeholder="Source of text (e.g., article, speech, report)"
            value={contextInfo.source}
            onChange={(e) => setContextInfo({ ...contextInfo, source: e.target.value })}
          />
          <Textarea
            className="bg-gray-700 text-white p-2 rounded mt-2"
            placeholder="Purpose of text (e.g., informative, persuasive)"
            value={contextInfo.purpose}
            onChange={(e) => setContextInfo({ ...contextInfo, purpose: e.target.value })}
          />
          <Textarea
            className="bg-gray-700 text-white p-2 rounded mt-2"
            placeholder="Date acquired or published"
            value={contextInfo.date}
            onChange={(e) => setContextInfo({ ...contextInfo, date: e.target.value })}
          />
          <Button className="mt-4 w-full bg-blue-500 hover:bg-blue-600" onClick={confirmAnalysis}>
            Confirm &amp; Analyze
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/** Renders the analysis as a self-contained Markdown document for download. */
function buildMarkdownReport(
  text: string,
  context: Required<AnalysisContext>,
  result: AnalysisResult,
): string {
  const lines: string[] = [
    "# Bias Detector Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Context",
    `- Source: ${context.source || "(not provided)"}`,
    `- Purpose: ${context.purpose || "(not provided)"}`,
    `- Date: ${context.date || "(not provided)"}`,
    "",
    "## Scores (0-100)",
    ...CATEGORIES.map((key) => `- ${CATEGORY_META[key].label}: ${result[key]}`),
    "",
    "## Summary",
    result.summary,
    "",
    "## Flagged passages",
  ];

  if (result.highlights.length === 0) {
    lines.push("None.");
  } else {
    for (const h of result.highlights) {
      lines.push(`- **${CATEGORY_META[h.category].label}**: "${h.quote}"`, `  - ${h.explanation}`);
    }
  }

  lines.push("", "## Analysed text", "", "```", text, "```", "");
  return lines.join("\n");
}
