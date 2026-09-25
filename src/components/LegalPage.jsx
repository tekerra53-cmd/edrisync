import { ShieldCheck } from 'lucide-react';

const privacy = {
  title: 'Privacy Policy',
  intro: 'This policy explains how Edrisync Limited collects and uses personal information when you use this website or contact us.',
  sections: [
    ['Information we collect', 'We collect the information you provide in our consultation form, such as your name, organisation, email address, phone number, service interest, and message. We may also collect limited technical information necessary to keep the site secure and working.'],
    ['How we use it', 'We use your information to respond to your request, provide our services, operate and secure this website, and meet legal obligations. We do not sell personal information.'],
    ['Sharing and retention', 'We share information only with service providers that help operate our business, when required by law, or with your permission. We retain enquiries only for as long as needed for these purposes and our legitimate record-keeping needs.'],
    ['Your choices', 'You may ask to access, correct, or delete your personal information, or object to certain processing, by emailing info@edrisync.com. We may need to verify your identity before responding.'],
    ['Security', 'We use reasonable technical and organisational safeguards. No online transmission or storage system is completely secure, so please avoid sending highly sensitive information through the website form.'],
    ['Changes and contact', 'We may update this policy as our practices or legal obligations change. Material updates will be posted here with a new effective date. Contact us at info@edrisync.com with privacy questions.'],
  ],
};

const terms = {
  title: 'Terms & Conditions',
  intro: 'These terms govern your use of the Edrisync website. By using it, you agree to them.',
  sections: [
    ['Website use', 'Use this website lawfully and do not interfere with its operation, attempt unauthorised access, or submit harmful, misleading, or infringing material.'],
    ['Information on this site', 'The content is provided for general information and does not constitute cybersecurity, legal, compliance, or other professional advice. Engagement terms control any services we provide.'],
    ['Intellectual property', 'The website, its design, content, and branding are owned by Edrisync or its licensors. You may not reproduce or use them without prior written permission, except as permitted by law.'],
    ['Third-party links', 'External links are provided for convenience. Edrisync does not control or endorse third-party sites and is not responsible for their content or practices.'],
    ['Disclaimers and liability', 'To the extent permitted by law, this website is provided as available without warranties. Edrisync will not be liable for indirect, incidental, special, or consequential losses arising from use of the site.'],
    ['Governing law and contact', 'These terms are governed by the laws applicable to Edrisync Limited. For questions, contact info@edrisync.com.'],
  ],
};

const cookies = {
  title: 'Cookie Policy',
  intro: 'This policy explains the limited use of cookies and similar browser storage on the Edrisync website.',
  sections: [
    ['What we use', 'The public website does not use advertising cookies. If you sign in to the admin workspace, Supabase uses essential browser storage to maintain and refresh your secure sign-in session.'],
    ['Your control', 'You can clear or block browser storage through your browser settings. Doing so may sign you out of the admin workspace or prevent it from functioning correctly.'],
    ['Changes and contact', 'We will update this page before introducing non-essential analytics or marketing cookies. Contact info@edrisync.com with questions.'],
  ],
};

export default function LegalPage({ type = 'privacy', onHome }) {
  const page = type === 'terms' ? terms : type === 'cookies' ? cookies : privacy;
  return <main className="mx-auto max-w-3xl px-6 pb-24 pt-36 text-[#000741]"><div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-11"><ShieldCheck className="h-8 w-8 text-[#087fd1]" /><p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#087fd1]">Effective 18 September 2026</p><h1 className="mt-3 text-4xl font-light tracking-tight sm:text-5xl">{page.title}</h1><p className="mt-6 text-base leading-7 text-slate-600">{page.intro}</p><div className="mt-10 space-y-8">{page.sections.map(([heading, body]) => <section key={heading}><h2 className="text-xl font-semibold">{heading}</h2><p className="mt-3 leading-7 text-slate-600">{body}</p></section>)}</div><button type="button" onClick={onHome} className="mt-12 text-sm font-semibold text-[#087fd1] hover:underline">← Return home</button></div></main>;
}
