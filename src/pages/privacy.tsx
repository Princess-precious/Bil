/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 13/09/2026 - 13:13:13
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import Navbar from "../components/Navbar";
function Privacy(){
  return(
    <>
      <Navbar/>
      <div className="flex flex-col items-center justify-center mt-[80px] px-14 md:px-90 font-hanken">
        <section className="flex flex-col gap-2 py-8">
          <p className="text-xs font-bold text-[#b35d52]">
            <span className="inline-block w-1.5 h-1.5 bg-[#b35d52] rounded-full"></span> Reader Trust & Privacy
          </p>
          <h1 className="text-2xl md:text-4xl font-playfair font-bold">Privacy & Reader Dignity</h1>
          <p className="text-xs">
            Reading and writing are contemplative acts. We built Bil around an uncompromised principle of restraint: zero surveillance, zero behavioral tracking, and total member sovereignty over every authored word.
          </p>
        </section>

        <section className="flex flex-col gap-2 py-8">
          <h1 className="text-xl md:text-2xl font-playfair font-bold">
            <span className="text-sm text-[#b35d52]">01</span> Zero Ad Trackers & Data Brokers
          </h1>
          <p className="text-xs">
            We never sell, rent, or trade your personal data. Bil operates without commercial advertising networks, programmatic auction tags, or behavioral analytics pixels. Our business model is powered solely through direct readers and patron memberships—never by commercializing your attention.
          </p>
        </section>

        <section className="flex flex-col gap-2 py-8">
          <h1 className="text-xl md:text-2xl font-playfair font-bold">
            <span className="text-sm text-[#b35d52]">02</span> Minimal Data Retained
          </h1>
          <p className="text-xs">
            We retain strictly what is essential to preserve your account and render your personal reading environment:
          </p>
          <div className="flex flex-col gap-2">
            <p className="text-xs ">
              <span className="inline-block w-1.5 h-1.5 bg-[#b35d52] rounded-full mr-1"></span>   <span className="font-bold">Account Essentials:</span> Your verified email, display name, and optional avatar.
            </p>
            <p className="text-xs ">
              <span className="inline-block w-1.5 h-1.5 bg-[#b35d52] rounded-full mr-1"></span>   <span className="font-bold">Personal Library:</span>  Published pieces, private drafts, saved reading bookmarks, and typography preferences.
            </p>
            <p className="text-xs ">
              <span className="inline-block w-1.5 h-1.5 bg-[#b35d52] rounded-full mr-1"></span>   <span className="font-bold">Payment Safeguards:</span>  Transactions are handled securely via PCI-DSS certified partners. We never store or inspect card details.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-2 py-8">
          <h1 className="text-xl md:text-2xl font-playfair font-bold">
            <span className="text-sm text-[#b35d52]">03</span> Your Sovereignty & Control
          </h1>
          <p className="text-xs">
            You maintain complete ownership of your creative archive. At any point, you may request an instantaneous full export of all your published articles, private drafts, and reading lists in standard Markdown and JSON formats, or execute permanent account deletion within 72 hours.
          </p>
        </section>

        <section className="flex flex-col gap-2 py-8">
          <h1 className="text-xl md:text-2xl font-playfair font-bold">
            <span className="text-sm text-[#b35d52]">04</span> Inquiries & Legal Desk
          </h1>
          <p className="text-xs">
            If you have questions regarding our privacy architecture, Swiss FADP / GDPR protocols, or wish to clarify any handling of your reader data, our editorial team handles inquiries directly.
          </p>
        </section>
      </div>
    </>
  );
}

export default Privacy;