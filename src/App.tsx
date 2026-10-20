/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { IncidentProvider, useIncident } from './context/IncidentContext.tsx';
import { Header } from './components/Header.tsx';
import { TeacherNotesModal } from './components/TeacherNotesModal.tsx';

// All 16 Slides
import { Slide1_Intro } from './components/slides/Slide1_Intro.tsx';
import { Slide2_ThreatActor } from './components/slides/Slide2_ThreatActor.tsx';
import { Slide3_NetworkTopology } from './components/slides/Slide3_NetworkTopology.tsx';
import { Slide4_RiskAssessment } from './components/slides/Slide4_RiskAssessment.tsx';
import { Slide5_ThreatEncyclopedia } from './components/slides/Slide5_ThreatEncyclopedia.tsx';
import { Slide6_PhishingLab } from './components/slides/Slide6_PhishingLab.tsx';
import { Slide7_MatchingGame } from './components/slides/Slide7_MatchingGame.tsx';
import { Slide8_DecisionRoom } from './components/slides/Slide8_DecisionRoom.tsx';
import { Slide9_BackupStrategies } from './components/slides/Slide9_BackupStrategies.tsx';
import { Slide10_SocDashboard } from './components/slides/Slide10_SocDashboard.tsx';
import { Slide11_KillChain } from './components/slides/Slide11_KillChain.tsx';
import { Slide12_RtoRpo } from './components/slides/Slide12_RtoRpo.tsx';
import { Slide13_DigitalForensics } from './components/slides/Slide13_DigitalForensics.tsx';
import { Slide14_LegalFramework } from './components/slides/Slide14_LegalFramework.tsx';
import { Slide15_FinalQuiz } from './components/slides/Slide15_FinalQuiz.tsx';
import { Slide16_EnrichmentExitTicket } from './components/slides/Slide16_EnrichmentExitTicket.tsx';

const SLIDE_TITLES = [
  "الغلاف ومقدمة سيناريو مدرسة الأمل",
  "ملف التهديد وملف المهاجم (Dossier)",
  "خريطة الشبكة وأداة Ping الحية",
  "مصفوفة تقييم الخطر السيبراني",
  "موسوعة التهديدات والتشفير الهجين",
  "معمل كشف التصيد الاحتيالي الموجه",
  "لعبة مطابقة التهديد والثغرة والحل",
  "غرفة القرار: الدقيقة 10:00 (شاشة الفدية)",
  "محاكي النسخ الاحتياطي: التراكمي vs التفاضلي",
  "مركز العمليات الأمنية (SOC Dashboard)",
  "سلسلة القتل السيبراني (Cyber Kill Chain)",
  "حاسبة مؤشرات التعافي (RTO & RPO)",
  "التحقيق الجنائي الرقمي وسلسلة الحيازة",
  "قانون حماية البيانات الشخصية الأردني 2023",
  "الاختبار التحصيلي والشهادة المعتمدة",
  "المركز الإثرائي وبطاقة الخروج (Exit Ticket)"
];

const MainContent: React.FC = () => {
  const { currentSlide } = useIncident();

  const renderSlide = () => {
    switch (currentSlide) {
      case 0: return <Slide1_Intro />;
      case 1: return <Slide2_ThreatActor />;
      case 2: return <Slide3_NetworkTopology />;
      case 3: return <Slide4_RiskAssessment />;
      case 4: return <Slide5_ThreatEncyclopedia />;
      case 5: return <Slide6_PhishingLab />;
      case 6: return <Slide7_MatchingGame />;
      case 7: return <Slide8_DecisionRoom />;
      case 8: return <Slide9_BackupStrategies />;
      case 9: return <Slide10_SocDashboard />;
      case 10: return <Slide11_KillChain />;
      case 11: return <Slide12_RtoRpo />;
      case 12: return <Slide13_DigitalForensics />;
      case 13: return <Slide14_LegalFramework />;
      case 14: return <Slide15_FinalQuiz />;
      case 15: return <Slide16_EnrichmentExitTicket />;
      default: return <Slide1_Intro />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      <Header slideTitles={SLIDE_TITLES} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
        {renderSlide()}
      </main>

      <footer className="no-print bg-slate-950 border-t border-slate-900 py-3 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>منهاج الأمن السيبراني والتحول الرقمي - مدرسة الأمل النموذجية © 2026</span>
          <span className="font-mono text-[11px]">اختصارات: [← الشريحة التالية] [→ السابقة] [N دليل المعلم] [F ملء الشاشة]</span>
        </div>
      </footer>

      <TeacherNotesModal />
    </div>
  );
};

export default function App() {
  return (
    <IncidentProvider>
      <MainContent />
    </IncidentProvider>
  );
}
