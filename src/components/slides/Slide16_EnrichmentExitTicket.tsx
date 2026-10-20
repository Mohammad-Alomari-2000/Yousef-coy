import React, { useState } from 'react';
import { TEXTBOOK_CONFIG } from '../../utils/textbookConfig.ts';
import { sounds } from '../../utils/soundEffects.ts';
import {
  Video,
  FileText,
  Printer,
  ExternalLink,
  Edit3,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface VideoCard {
  id: number;
  title: string;
  topicAr: string;
  url: string;
  placeholder: string;
}

export const Slide16_EnrichmentExitTicket: React.FC = () => {
  const refData = TEXTBOOK_CONFIG.references.slide16_enrichment;

  // Video cards with editable URL field and placeholders (no invented links)
  const [videoCards, setVideoCards] = useState<VideoCard[]>([
    {
      id: 1,
      title: 'فيديو إثرائي 1: آلية انتشار برمجيات الفدية وهجمات SMB',
      topicAr: 'شرح عملي يوضح كيفية استغلال ثغرة EternalBlue / SMBv1 في تفشي دودة الفدية بين الأجهزة.',
      url: '',
      placeholder: 'أدخل رابط الفيديو التعليمي المعتمد هنا (YouTube / Drive)'
    },
    {
      id: 2,
      title: 'فيديو إثرائي 2: التحقيق الجنائي الرقمي واستخراج الذاكرة RAM',
      topicAr: 'خطوات استخراج الأدلة الرقمية الحية وحفظها وفق معايير سلسلة الحيازة الجنائية.',
      url: '',
      placeholder: 'أدخل رابط الفيديو التعليمي المعتمد هنا (YouTube / Drive)'
    },
    {
      id: 3,
      title: 'فيديو إثرائي 3: التوعية بقانون حماية البيانات الشخصية الأردني 2023',
      topicAr: 'دليل مبسط لحقوق الأفراد والتزامات المدارس في حماية الخصوصية ومكافحة التسريب.',
      url: '',
      placeholder: 'أدخل رابط الفيديو التعليمي المعتمد هنا (YouTube / Drive)'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'enrichment' | 'exit_ticket'>('exit_ticket');

  // Exit Ticket state
  const [exitTicketData, setExitTicketData] = useState({
    studentName: '',
    teamName: 'فريق الدفاع السيبراني',
    date: '2026-10-19',
    q1Answer: 'تعلمت أن دودة الفدية تنتشر ذاتياً عبر الشبكة دون حاجة لتدخل بشري مستغلة منفذ SMB 445، وأن إطفاء الجهاز فجأة يدمر الأدلة ومفتاح فك التشفير في الذاكرة RAM.',
    q2Answer: '1) التحقق من النطاق الحقيقي للمرسل وعدم الانخداع بالاسم الظاهر، 2) فحص الامتداد المزدوج (.xlsm.exe) وعدم تصديق الأيقونة، 3) تمرير الفأرة على الروابط والتأكد من الوجهة.',
    q3Answer: 'لأن التستر يحرم الجهات المختصة (NCSC) من التدخل لحماية بقية المؤسسات، ويضاعف العقوبات القانونية والمدنية على المدرسة ويفقد أولياء الأمور الثقة.'
  });

  const handleUpdateVideoUrl = (id: number, newUrl: string) => {
    setVideoCards(prev => prev.map(v => v.id === id ? { ...v, url: newUrl } : v));
  };

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  return (
    <div className="space-y-5 animate-fade-in max-w-5xl mx-auto">
      {/* Textbook Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400 no-print">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500" />
          <span className="font-semibold text-slate-200">{refData.unit}</span>
          <span>•</span>
          <span>{refData.topic}</span>
        </div>
        <div className="font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50">
          مرجع الكتاب: {refData.pages}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-2 no-print">
        <button
          onClick={() => { sounds.playClick(); setActiveTab('exit_ticket'); }}
          className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition flex items-center gap-2 border-t border-x ${
            activeTab === 'exit_ticket'
              ? 'bg-slate-900 border-cyan-500/50 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>تذكرة الخروج التأملية (Exit Ticket - PDF)</span>
        </button>

        <button
          onClick={() => { sounds.playClick(); setActiveTab('enrichment'); }}
          className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition flex items-center gap-2 border-t border-x ${
            activeTab === 'enrichment'
              ? 'bg-slate-900 border-amber-500/50 text-amber-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Video className="w-4 h-4 text-amber-400" />
          <span>المركز الإثرائي والفيديوهات (روابط قابلة للتعديل)</span>
        </button>
      </div>

      {/* Tab 1: Exit Ticket */}
      {activeTab === 'exit_ticket' && (
        <div className="space-y-4">
          
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/80 border border-slate-800 no-print">
            <div>
              <h3 className="text-sm font-bold text-white">تذكرة الخروج التقييمية (Classroom Exit Ticket)</h3>
              <p className="text-xs text-slate-400">
                عبّر عن تأملاتك التعليمية في الأسئلة الثلاثة، ثم اضغط زر الطباعة لحفظ التذكرة كملف PDF.
              </p>
            </div>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة / تصدير PDF</span>
            </button>
          </div>

          {/* Printable Ticket Paper */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-950 border-2 border-slate-800 shadow-2xl space-y-5 print:border-2 print:border-black print:bg-white print:text-black">
            
            {/* Ticket Header */}
            <div className="border-b-2 border-dashed border-slate-800 pb-4 flex flex-wrap items-center justify-between gap-3 print:border-black">
              <div>
                <span className="text-[11px] text-cyan-400 font-bold uppercase font-mono">
                  {TEXTBOOK_CONFIG.curriculumName}
                </span>
                <h3 className="text-lg font-bold text-white print:text-black">
                  بطاقة خروج وتقييم ذاتي: سيناريو دودة الفدية - {TEXTBOOK_CONFIG.schoolName}
                </h3>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <div>
                  <span className="text-slate-400 ml-1">اسم الطالب:</span>
                  <input
                    type="text"
                    value={exitTicketData.studentName}
                    onChange={(e) => setExitTicketData({ ...exitTicketData, studentName: e.target.value })}
                    placeholder="اكتب اسمك هنا"
                    className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs font-bold print:border-b print:border-black print:bg-transparent print:text-black"
                  />
                </div>
                <div>
                  <span className="text-slate-400 ml-1">التاريخ:</span>
                  <span className="font-mono text-slate-300 print:text-black font-bold">{exitTicketData.date}</span>
                </div>
              </div>
            </div>

            {/* Question 1 */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-cyan-300 print:text-black flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center font-mono text-[11px] print:bg-transparent print:border print:border-black">
                  1
                </span>
                ما أهم درس تعلمته اليوم لحماية بيانات مدرستك وأجهزتك من دودة الفدية والتصيد؟
              </label>
              <textarea
                value={exitTicketData.q1Answer}
                onChange={(e) => setExitTicketData({ ...exitTicketData, q1Answer: e.target.value })}
                rows={2}
                className="w-full bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-cyan-500 print:bg-transparent print:border-slate-400 print:text-black"
              />
            </div>

            {/* Question 2 */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-amber-300 print:text-black flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-950 text-amber-400 flex items-center justify-center font-mono text-[11px] print:bg-transparent print:border print:border-black">
                  2
                </span>
                إذا وصلك بريد إلكتروني عاجل يطلب فتح مرفق درجات، ما الخطوات الثلاث التي ستتبعها قبل فتحه؟
              </label>
              <textarea
                value={exitTicketData.q2Answer}
                onChange={(e) => setExitTicketData({ ...exitTicketData, q2Answer: e.target.value })}
                rows={2}
                className="w-full bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-amber-500 print:bg-transparent print:border-slate-400 print:text-black"
              />
            </div>

            {/* Question 3 */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-rose-300 print:text-black flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-rose-950 text-rose-400 flex items-center justify-center font-mono text-[11px] print:bg-transparent print:border print:border-black">
                  3
                </span>
                لماذا يمنع القانون الأردني لسنة 2023 التستر على حوادث تسريب البيانات الشخصية؟
              </label>
              <textarea
                value={exitTicketData.q3Answer}
                onChange={(e) => setExitTicketData({ ...exitTicketData, q3Answer: e.target.value })}
                rows={2}
                className="w-full bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-rose-500 print:bg-transparent print:border-slate-400 print:text-black"
              />
            </div>

            {/* Ticket Footer */}
            <div className="pt-3 border-t border-slate-800/80 flex justify-between items-center text-[10px] text-slate-500 print:text-black">
              <span>توقيع المعلم: ______________________</span>
              <span>تقييم المخرجات: [ ممتاز / جيد جداً / متابعة ]</span>
            </div>

          </div>

        </div>
      )}

      {/* Tab 2: Videos with Editable URLs */}
      {activeTab === 'enrichment' && (
        <div className="space-y-4 no-print">
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
            <Edit3 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>ميزة قابلة للتخصيص للمعلم:</strong> يمكنك لصق وتحديث روابط الفيديو المعتمدة لديك في الحقول أدناه لتظهر لطلبتك في الحصة دون اختراع أي روابط وهمية.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {videoCards.map((video) => (
              <div key={video.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between shadow-xl">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Video className="w-4 h-4" />
                    <span className="text-xs font-bold">وسائط إثرائية #{video.id}</span>
                  </div>

                  <h4 className="text-xs font-bold text-white">{video.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{video.topicAr}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="text-[10px] text-slate-400 block font-semibold">رابط الفيديو المعتمد:</label>
                  <input
                    type="text"
                    value={video.url}
                    onChange={(e) => handleUpdateVideoUrl(video.id, e.target.value)}
                    placeholder={video.placeholder}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                    dir="ltr"
                  />

                  {video.url ? (
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/50 rounded text-xs font-bold flex items-center justify-center gap-1.5 transition"
                    >
                      <span>فتح الفيديو في نافذة جديدة</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="text-[10px] text-slate-500 text-center font-mono">
                      (لم يتم إدخال رابط بعد - يمكنك إضافته الآن)
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
