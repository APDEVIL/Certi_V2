import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  renderToBuffer,
  Font,
} from "@react-pdf/renderer";
import { type TemplateId, TEMPLATE_IDS } from "@/server/utils/constants";

export type CertificateData = {
  certificateId: string;
  recipientName: string;
  courseName: string;
  issuedBy: string;
  issuedAt: Date;
  expiresAt?: Date | null;
  templateId: TemplateId;
  qrCodeBase64: string;
  metadata?: Record<string, unknown>;
};

// ─── Classic Template ─────────────────────────────────────────────────────────

const classicStyles = StyleSheet.create({
  page: {
    backgroundColor: "#fffdf7",
    padding: 60,
    fontFamily: "Helvetica",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  border: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    borderWidth: 3,
    borderColor: "#c9a84c",
    borderStyle: "solid",
  },
  title: {
    fontSize: 36,
    color: "#2c2c2c",
    marginTop: 40,
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 8,
    letterSpacing: 2,
  },
  divider: {
    width: 200,
    height: 1,
    backgroundColor: "#c9a84c",
    marginTop: 20,
    marginBottom: 20,
  },
  presentedTo: {
    fontSize: 13,
    color: "#666",
    marginTop: 24,
  },
  recipientName: {
    fontSize: 32,
    color: "#1a1a1a",
    marginTop: 8,
    fontFamily: "Helvetica-Bold",
  },
  courseLabel: {
    fontSize: 13,
    color: "#666",
    marginTop: 20,
  },
  courseName: {
    fontSize: 20,
    color: "#1a1a1a",
    marginTop: 6,
    fontFamily: "Helvetica-Bold",
  },
  issuedBy: {
    fontSize: 13,
    color: "#666",
    marginTop: 16,
  },
  footer: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
  },
  certId: {
    fontSize: 10,
    color: "#aaa",
  },
  qr: {
    width: 70,
    height: 70,
  },
  date: {
    fontSize: 11,
    color: "#888",
    marginTop: 6,
  },
});

// ─── Modern Template ──────────────────────────────────────────────────────────

const modernStyles = StyleSheet.create({
  page: {
    backgroundColor: "#0f0f0f",
    padding: 60,
    fontFamily: "Helvetica",
    display: "flex",
    flexDirection: "column",
  },
  accent: {
    width: 60,
    height: 4,
    backgroundColor: "#6366f1",
    marginBottom: 32,
  },
  title: {
    fontSize: 11,
    color: "#6366f1",
    letterSpacing: 4,
    marginBottom: 8,
  },
  recipientName: {
    fontSize: 40,
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
  },
  courseLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  courseName: {
    fontSize: 18,
    color: "#d1d5db",
    marginBottom: 32,
  },
  issuedBy: {
    fontSize: 12,
    color: "#888",
  },
  footer: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  certId: {
    fontSize: 10,
    color: "#444",
  },
  date: {
    fontSize: 10,
    color: "#444",
    marginTop: 4,
  },
  qr: {
    width: 70,
    height: 70,
  },
});

// ─── Minimal Template ─────────────────────────────────────────────────────────

const minimalStyles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 72,
    fontFamily: "Helvetica",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 10,
    color: "#999",
    letterSpacing: 3,
    marginBottom: 48,
  },
  recipientName: {
    fontSize: 36,
    color: "#111",
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  courseLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 24,
    marginBottom: 4,
  },
  courseName: {
    fontSize: 16,
    color: "#333",
  },
  issuedBy: {
    fontSize: 12,
    color: "#999",
    marginTop: 12,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#eee",
    marginTop: 48,
    marginBottom: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  certId: {
    fontSize: 10,
    color: "#bbb",
  },
  date: {
    fontSize: 10,
    color: "#bbb",
    marginTop: 4,
  },
  qr: {
    width: 60,
    height: 60,
  },
});

// ─── Template Components ──────────────────────────────────────────────────────

const ClassicTemplate = (data: CertificateData) =>
  React.createElement(
    Page,
    { size: "A4", orientation: "landscape", style: classicStyles.page },
    React.createElement(View, { style: classicStyles.border }),
    React.createElement(Text, { style: classicStyles.title }, "CERTIFICATE"),
    React.createElement(Text, { style: classicStyles.subtitle }, "OF COMPLETION"),
    React.createElement(View, { style: classicStyles.divider }),
    React.createElement(Text, { style: classicStyles.presentedTo }, "This certificate is proudly presented to"),
    React.createElement(Text, { style: classicStyles.recipientName }, data.recipientName),
    React.createElement(Text, { style: classicStyles.courseLabel }, "for successfully completing"),
    React.createElement(Text, { style: classicStyles.courseName }, data.courseName),
    React.createElement(Text, { style: classicStyles.issuedBy }, `Issued by ${data.issuedBy} · ${data.issuedAt.toLocaleDateString()}`),
    React.createElement(
      View,
      { style: classicStyles.footer },
      React.createElement(
        View,
        null,
        React.createElement(Text, { style: classicStyles.certId }, `Certificate ID: ${data.certificateId}`),
        data.expiresAt &&
          React.createElement(Text, { style: classicStyles.date }, `Valid until: ${data.expiresAt.toLocaleDateString()}`)
      ),
      React.createElement(Image, { style: classicStyles.qr, src: data.qrCodeBase64 })
    )
  );

const ModernTemplate = (data: CertificateData) =>
  React.createElement(
    Page,
    { size: "A4", orientation: "landscape", style: modernStyles.page },
    React.createElement(View, { style: modernStyles.accent }),
    React.createElement(Text, { style: modernStyles.title }, "CERTIFICATE OF COMPLETION"),
    React.createElement(Text, { style: modernStyles.recipientName }, data.recipientName),
    React.createElement(Text, { style: modernStyles.courseLabel }, "completed"),
    React.createElement(Text, { style: modernStyles.courseName }, data.courseName),
    React.createElement(Text, { style: modernStyles.issuedBy }, `Issued by ${data.issuedBy} · ${data.issuedAt.toLocaleDateString()}`),
    React.createElement(
      View,
      { style: modernStyles.footer },
      React.createElement(
        View,
        null,
        React.createElement(Text, { style: modernStyles.certId }, `ID: ${data.certificateId}`),
        data.expiresAt &&
          React.createElement(Text, { style: modernStyles.date }, `Expires: ${data.expiresAt.toLocaleDateString()}`)
      ),
      React.createElement(Image, { style: modernStyles.qr, src: data.qrCodeBase64 })
    )
  );

const MinimalTemplate = (data: CertificateData) =>
  React.createElement(
    Page,
    { size: "A4", orientation: "landscape", style: minimalStyles.page },
    React.createElement(Text, { style: minimalStyles.title }, "CERTIFICATE OF COMPLETION"),
    React.createElement(Text, { style: minimalStyles.recipientName }, data.recipientName),
    React.createElement(Text, { style: minimalStyles.courseLabel }, "Course"),
    React.createElement(Text, { style: minimalStyles.courseName }, data.courseName),
    React.createElement(Text, { style: minimalStyles.issuedBy }, `Issued by ${data.issuedBy} · ${data.issuedAt.toLocaleDateString()}`),
    React.createElement(View, { style: minimalStyles.divider }),
    React.createElement(
      View,
      { style: minimalStyles.footer },
      React.createElement(
        View,
        null,
        React.createElement(Text, { style: minimalStyles.certId }, `Certificate ID: ${data.certificateId}`),
        data.expiresAt &&
          React.createElement(Text, { style: minimalStyles.date }, `Valid until: ${data.expiresAt.toLocaleDateString()}`)
      ),
      React.createElement(Image, { style: minimalStyles.qr, src: data.qrCodeBase64 })
    )
  );

// ─── Main Service ─────────────────────────────────────────────────────────────

export const pdfService = {
  async generate(data: CertificateData): Promise<Buffer> {
    const templateMap = {
      [TEMPLATE_IDS.CLASSIC]: ClassicTemplate,
      [TEMPLATE_IDS.MODERN]: ModernTemplate,
      [TEMPLATE_IDS.MINIMAL]: MinimalTemplate,
    };

    const TemplateComponent = templateMap[data.templateId];

    const doc = React.createElement(Document, null,
      TemplateComponent(data)
    );

    const buffer = await renderToBuffer(doc);
    return Buffer.from(buffer);
  },
};