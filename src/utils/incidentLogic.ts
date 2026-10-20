import type { DeviceState, NetworkStatus, PingReply, RiskEvaluation } from '../types/incident.ts';
import { TEXTBOOK_CONFIG } from './textbookConfig.ts';

export const TIMELINE_MILESTONES = [
  {
    timeInSeconds: 0,
    timeString: '00:00',
    titleAr: 'وصول البريد الاحتيالي',
    descriptionAr: 'وصول رسالة تصيد موجه تدعي أنها من الوزارة مرفق بها ملف مزيف لتعديل الدرجات.',
    killChainPhase: 'التوصيل (Delivery) - المرحلة 3',
    killChainStageNumber: 3,
    severity: 'low'
  },
  {
    timeInSeconds: 135, // 02:15
    timeString: '02:15',
    titleAr: 'الموظفة سارة تفتح المرفق',
    descriptionAr: 'الموظفة سارة في قسم التسجيل تفتح الملف الملغوم Grades_Update_Final.xlsm.exe على الجهاز 192.168.1.104.',
    killChainPhase: 'الاستغلال والتثبيت (Exploitation & Installation) - المرحلتان 4 و 5',
    killChainStageNumber: 4,
    severity: 'medium'
  },
  {
    timeInSeconds: 270, // 04:30
    timeString: '04:30',
    titleAr: 'تصعيد الصلاحيات',
    descriptionAr: 'استغلال إعادة استخدام كلمة مرور المشرف المحلي للحصول على امتيازات Administrator.',
    killChainPhase: 'التثبيت والسيطرة (Installation) - المرحلة 5',
    killChainStageNumber: 5,
    severity: 'high'
  },
  {
    timeInSeconds: 405, // 06:45
    timeString: '06:45',
    titleAr: 'الحركة الجانبية عبر منفذ SMB 445',
    descriptionAr: 'انتشار دودة الفدية جانبياً إلى خادم النطاق AD (192.168.1.10) ونظام معلومات الطلبة SIS (192.168.1.15).',
    killChainPhase: 'الحركة الجانبية والانتشار الداخلي - امتداد للمرحلة 5 و 6',
    killChainStageNumber: 5,
    severity: 'critical'
  },
  {
    timeInSeconds: 530, // 08:50
    timeString: '08:50',
    titleAr: 'تسريب علامات 450 طالباً',
    descriptionAr: 'إنشاء قناة تحكم C2 وتسريب كشوف علامات 450 طالباً مشفرة إلى الخادم الخارجي 203.0.113.45.',
    killChainPhase: 'القيادة والتحكم (Command & Control) - المرحلة 6',
    killChainStageNumber: 6,
    severity: 'critical'
  },
  {
    timeInSeconds: 600, // 10:00
    timeString: '10:00',
    titleAr: 'التشفير وظهور شاشة الفدية',
    descriptionAr: 'تشفير قواعد بيانات SIS والملفات الحيوية بواسطة تشفير هجين (AES+RSA) وظهور شاشة الفدية والمطالبة بـ 2 BTC.',
    killChainPhase: 'تحقيق الأهداف (Actions on Objectives) - المرحلة 7',
    killChainStageNumber: 7,
    severity: 'critical'
  }
];

export function formatTime(seconds: number): string {
  const clamped = Math.max(0, Math.min(600, Math.floor(seconds)));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function parseTimeString(timeStr: string): number {
  const parts = timeStr.split(':').map(Number);
  if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) return 0;
  return parts[0] * 60 + parts[1];
}

export function getNetworkStatus(seconds: number, isContained: boolean): { status: NetworkStatus; labelAr: string; badgeColor: string } {
  if (isContained) {
    return { status: 'contained', labelAr: 'تم الاحتواء والعزل', badgeColor: 'bg-blue-900/60 text-blue-300 border-blue-500' };
  }
  if (seconds < 135) { // before 02:15
    return { status: 'normal', labelAr: 'طبيعي وآمن', badgeColor: 'bg-emerald-900/60 text-emerald-300 border-emerald-500' };
  }
  if (seconds < 405) { // 02:15 to 06:44
    return { status: 'suspicious', labelAr: 'نشاط مشبوه قيد التحقيق', badgeColor: 'bg-amber-900/60 text-amber-300 border-amber-500' };
  }
  // 06:45 onwards
  return { status: 'under_attack', labelAr: 'تحت الهجوم النشط', badgeColor: 'bg-rose-900/60 text-rose-300 border-rose-500' };
}

export function getDeviceState(ip: string, seconds: number, isContained: boolean): DeviceState {
  if (isContained) {
    if (ip.startsWith('192.168.2.')) return 'isolated';
    if (['192.168.1.104', '192.168.1.10', '192.168.1.15'].includes(ip)) return 'contained';
    return 'safe';
  }

  // Labs subnet is isolated by VLAN
  if (ip.startsWith('192.168.2.')) {
    return 'isolated';
  }

  if (ip === TEXTBOOK_CONFIG.ips.firewall) {
    return 'safe';
  }

  // Sarah Registration PC: 192.168.1.104
  if (ip === TEXTBOOK_CONFIG.ips.sarahPc) {
    if (seconds < 135) return 'vulnerable'; // before 02:15
    if (seconds < 600) return 'compromised'; // 02:15 to 09:59
    return 'encrypted'; // 10:00
  }

  // AD Server: 192.168.1.10
  if (ip === TEXTBOOK_CONFIG.ips.adServer) {
    if (seconds < 405) return 'vulnerable'; // before 06:45
    if (seconds < 600) return 'compromised'; // 06:45 to 09:59
    return 'encrypted'; // 10:00
  }

  // SIS Server: 192.168.1.15
  if (ip === TEXTBOOK_CONFIG.ips.sisServer) {
    if (seconds < 405) return 'vulnerable'; // before 06:45
    if (seconds < 600) return 'compromised'; // 06:45 to 09:59
    return 'encrypted'; // 10:00
  }

  // Management PC: 192.168.1.100
  if (ip === TEXTBOOK_CONFIG.ips.managementPc) {
    if (seconds < 600) return 'vulnerable';
    return 'encrypted';
  }

  return 'safe';
}

export function calculateRisk(threat: number, vulnerability: number, impact: number): RiskEvaluation {
  // Formula: (T x V x I) / 125 * 100
  const t = Math.max(1, Math.min(5, threat));
  const v = Math.max(1, Math.min(5, vulnerability));
  const i = Math.max(1, Math.min(5, impact));

  const rawScore = ((t * v * i) / 125) * 100;
  const score = Math.round(rawScore * 10) / 10;

  let level: 'low' | 'medium' | 'high' = 'low';
  let color = 'text-emerald-400';
  let labelAr = 'مستوى منخفض (0 - 33)';

  if (score >= 67) {
    level = 'high';
    color = 'text-rose-400';
    labelAr = 'مستوى مرتفع وحرج (67 - 100)';
  } else if (score >= 34) {
    level = 'medium';
    color = 'text-amber-400';
    labelAr = 'مستوى متوسط (34 - 66)';
  }

  return {
    threat: t,
    vulnerability: v,
    impact: i,
    rawFormula: `(${t} × ${v} × ${i}) / 125 × 100 = ${score}%`,
    score,
    level,
    color,
    labelAr
  };
}

export function isValidIPv4(ip: string): boolean {
  const trimmed = ip.trim();
  const parts = trimmed.split('.');
  if (parts.length !== 4) return false;
  return parts.every(part => {
    if (!/^\d+$/.test(part)) return false;
    const num = parseInt(part, 10);
    return num >= 0 && num <= 255 && (part === '0' || !part.startsWith('0'));
  });
}

export function generatePingResult(targetIp: string, seconds: number, isContained: boolean): PingReply {
  const trimmed = targetIp.trim();

  if (!isValidIPv4(trimmed)) {
    return {
      status: 'unreachable',
      ip: trimmed,
      lines: [
        `PING ${trimmed} (${trimmed}) 56(84) bytes of data.`,
        `ping: unknown host or invalid IP address format: ${trimmed}`
      ],
      badgeColor: 'slate'
    };
  }

  // Check known subnets or specific nodes
  const knownIps = [
    TEXTBOOK_CONFIG.ips.firewall,
    TEXTBOOK_CONFIG.ips.adServer,
    TEXTBOOK_CONFIG.ips.sisServer,
    TEXTBOOK_CONFIG.ips.sarahPc,
    TEXTBOOK_CONFIG.ips.managementPc
  ];

  const isLabVlan = trimmed.startsWith('192.168.2.');
  const isKnownNode = knownIps.includes(trimmed);

  if (!isLabVlan && !isKnownNode) {
    return {
      status: 'unreachable',
      ip: trimmed,
      lines: [
        `PING ${trimmed} (${trimmed}) 56(84) bytes of data.`,
        `From 192.168.1.1 icmp_seq=1 Destination Host Unreachable`,
        `From 192.168.1.1 icmp_seq=2 Destination Host Unreachable`,
        `From 192.168.1.1 icmp_seq=3 Destination Host Unreachable`,
        `--- ${trimmed} ping statistics ---`,
        `3 packets transmitted, 0 received, 100% packet loss`
      ],
      badgeColor: 'slate'
    };
  }

  // Isolated VLAN (192.168.2.0/24)
  if (isLabVlan) {
    return {
      status: 'isolated',
      ip: trimmed,
      lines: [
        `PING ${trimmed} (${trimmed}) 56(84) bytes of data.`,
        `Request timed out – blocked by VLAN segmentation (ACL Rule 402: Student-Labs-Isolated).`,
        `Request timed out – blocked by VLAN segmentation.`,
        `--- ${trimmed} ping statistics ---`,
        `3 packets transmitted, 0 received, 100% packet loss (حماية نشطة: معزول في شبكة فرعية آمنة)`
      ],
      alertMessageAr: 'الشبكة معزولة بنجاح بواسطة VLAN 20؛ لا يمكن الوصول المتبادل لحماية مختبرات الحاسوب من التفشي.',
      badgeColor: 'indigo'
    };
  }

  const deviceState = getDeviceState(trimmed, seconds, isContained);

  if (deviceState === 'contained') {
    return {
      status: 'contained',
      ip: trimmed,
      ttl: 128,
      timeMs: 1.2,
      lines: [
        `PING ${trimmed} (${trimmed}) 56(84) bytes of data.`,
        `64 bytes from ${trimmed}: icmp_seq=1 ttl=128 time=1.21 ms [FORENSIC SAFE MODE]`,
        `64 bytes from ${trimmed}: icmp_seq=2 ttl=128 time=1.19 ms [PORT 445 BLOCKED]`,
        `--- ${trimmed} ping statistics ---`,
        `2 packets transmitted, 2 received, 0% packet loss, rtt min/avg/max = 1.19/1.20/1.21 ms`
      ],
      alertMessageAr: 'تم احتواء الجهاز وعزله في شبكة الفحص الجنائي الرقمي مع منع المنافذ الحرجة.',
      badgeColor: 'indigo'
    };
  }

  if (deviceState === 'encrypted') {
    return {
      status: 'encrypted',
      ip: trimmed,
      lines: [
        `PING ${trimmed} (${trimmed}) 56(84) bytes of data.`,
        `64 bytes from ${trimmed}: icmp_seq=1 ttl=64 time=45.2 ms`,
        `[CRITICAL ALERT] HTTP Service (Port 80/443) DOWN on SIS host!`,
        `[ALERT] Port 80 Connection refused - Ransom note detected: READ_ME_DECRYPT.txt.enc`,
        `[ALERT] Local database locked by Ransomware payload.`
      ],
      alertMessageAr: 'الجهاز مشفر بالكامل (خدمة SIS متوقفة على المنفذ 80 ورسالة الفدية معروضة).',
      badgeColor: 'rose'
    };
  }

  if (deviceState === 'compromised') {
    return {
      status: 'compromised',
      ip: trimmed,
      ttl: 64,
      timeMs: 248.5,
      lines: [
        `PING ${trimmed} (${trimmed}) 56(84) bytes of data.`,
        `64 bytes from ${trimmed}: icmp_seq=1 ttl=64 time=182.4 ms (High Jitter)`,
        `64 bytes from ${trimmed}: icmp_seq=2 ttl=64 time=295.1 ms`,
        `[CRITICAL WARNING] اتصال صادر مشبوه إلى ${TEXTBOOK_CONFIG.ips.attackerC2}:443`,
        `[ANOMALY] Heavy outbound traffic detected (Data Exfiltration in progress)`
      ],
      alertMessageAr: `تحذير أحمر: الجهاز مخترق حالياً ويوجد اتصال صادر مشبوه إلى خادم القيادة والتحكم ${TEXTBOOK_CONFIG.ips.attackerC2}:443.`,
      badgeColor: 'rose'
    };
  }

  if (deviceState === 'vulnerable') {
    let openPortWarning = 'منفذ SMB 445 مفتوح دون توثيق متعدد العوامل MFA وبكلمة مرور مشرف متكررة.';
    if (trimmed === TEXTBOOK_CONFIG.ips.sarahPc) {
      openPortWarning = 'برامج معالجة النصوص تقبل وحدات الماكرو القديمة وحساب المستخدم يتمتع بصلاحيات محلية مرتفعة.';
    }
    return {
      status: 'vulnerable',
      ip: trimmed,
      ttl: 128,
      timeMs: 1.4,
      lines: [
        `PING ${trimmed} (${trimmed}) 56(84) bytes of data.`,
        `64 bytes from ${trimmed}: icmp_seq=1 ttl=128 time=1.38 ms`,
        `64 bytes from ${trimmed}: icmp_seq=2 ttl=128 time=1.42 ms`,
        `[VULNERABILITY DETECTED] ${openPortWarning}`
      ],
      alertMessageAr: `تنبيه أصفر: استجابة طبيعية ولكن تم اكتشاف ثغرة: ${openPortWarning}`,
      badgeColor: 'amber'
    };
  }

  // Safe
  return {
    status: 'safe',
    ip: trimmed,
    ttl: 128,
    timeMs: 0.9,
    lines: [
      `PING ${trimmed} (${trimmed}) 56(84) bytes of data.`,
      `64 bytes from ${trimmed}: icmp_seq=1 ttl=128 time=0.92 ms`,
      `64 bytes from ${trimmed}: icmp_seq=2 ttl=128 time=0.88 ms`,
      `--- ${trimmed} ping statistics ---`,
      `2 packets transmitted, 2 received, 0% packet loss, rtt min/avg/max = 0.88/0.90/0.92 ms`
    ],
    alertMessageAr: 'الجهاز سليم ويعمل بكفاءة دون رصد أي أنشطة مشبوهة أو ثغرات مكشوفة.',
    badgeColor: 'emerald'
  };
}

export function evaluateBackup(strategy: 'incremental' | 'differential', targetDay: 'thursday') {
  if (strategy === 'incremental') {
    return {
      nameAr: 'النسخ الاحتياطي التراكمي (Incremental Backup)',
      requiredSets: [
        'نسخة الأحد الكاملة (Full Backup - Sunday 100 GB)',
        'نسخة الإثنين التراكمية (Monday Changes 10 GB)',
        'نسخة الثلاثاء التراكمية (Tuesday Changes 12 GB)',
        'نسخة الأربعاء التراكمية (Wednesday Changes 14 GB)',
        'نسخة الخميس التراكمية (Thursday Changes 15 GB)'
      ],
      totalSetsCount: 5,
      restoreStepsExplanationAr: 'لاستعادة بيانات يوم الخميس، يجب استعادة نسخة الأحد الكاملة أولاً، ثم تطبيق جميع النسخ اليومية التراكمية بالترتيب (الإثنين، ثم الثلاثاء، ثم الأربعاء، ثم الخميس). إذا تلفت أي حلقة وسيطة تفشل الاستعادة.',
      storageEfficiencyAr: 'استهلاك تخزين منخفض جداً (يسجل فقط التغييرات منذ آخر نسخة أياً كان نوعها).',
      restoreTimeRatingAr: 'أبطأ في الاستعادة (تتطلب معالجة 5 وسائط متتالية).',
      restoreTimeMinutes: 45
    };
  } else {
    return {
      nameAr: 'النسخ الاحتياطي التفاضلي (Differential Backup)',
      requiredSets: [
        'نسخة الأحد الكاملة (Full Backup - Sunday 100 GB)',
        'نسخة الخميس التفاضلية (Thursday Cumulative Changes 51 GB)'
      ],
      totalSetsCount: 2,
      restoreStepsExplanationAr: 'لاستعادة بيانات يوم الخميس، نحتاج فقط إلى وسيطين: نسخة الأحد الكاملة ونسخة الخميس التفاضلية (لأنها تشمل تلقائياً كل التغييرات المتراكمة منذ الأحد).',
      storageEfficiencyAr: 'استهلاك تخزين متوسط إلى مرتفع (يكبر حجم النسخة مع توالي أيام الأسبوع).',
      restoreTimeRatingAr: 'سريع جداً في الاستعادة (يتطلب استعادة ملفين فقط).',
      restoreTimeMinutes: 18
    };
  }
}

export function calculateRtoRpo(backupIntervalHours: number, restoreSpeedMbps: number, dataSizeGb: number) {
  // RPO (Recovery Point Objective): maximum data loss window in hours
  const rpoHours = backupIntervalHours;

  // RTO (Recovery Time Objective): downtime in hours to transfer and restore data
  // Data in megabits = dataSizeGb * 1024 * 8 = dataSizeGb * 8192
  const totalMegabits = dataSizeGb * 8192;
  const transferSeconds = restoreSpeedMbps > 0 ? totalMegabits / restoreSpeedMbps : 0;
  // Add 15 minutes (0.25 hours) for OS boots and sanity database check
  const restoreHours = Math.round((transferSeconds / 3600 + 0.25) * 10) / 10;

  return {
    rpoHours,
    rtoHours: restoreHours,
    dataLossSummaryAr: `أقصى نافذة فقدان للبيانات (RPO): ${rpoHours} ساعة عمل.`,
    downtimeSummaryAr: `الزمن المقدر لعودة الخدمات للعمل (RTO): ${restoreHours} ساعة.`
  };
}
