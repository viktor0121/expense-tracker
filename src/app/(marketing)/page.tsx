import { ActionButtons } from "./_components/actions-button";
import { BackgroundDotsContainer } from "./_components/background-dots-container";
import { FeatureCards } from "./_components/feature-cards";
import { FlipWords } from "./_components/flip-words";
import { Spotlight } from "./_components/spotlight";

export default function Page() {
  const heroWords = ["Goals", "Expenses", "Earnings"];

  return (
    <>
      <section className="grid h-[calc(100vh-3.5rem)] w-full place-items-center bg-background py-12 md:py-24 lg:py-32">
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

        <main className="container flex max-w-3xl flex-col items-center justify-center space-y-4 px-4 md:px-6">
          <h1 className="space-y-3 text-center text-5xl font-bold tracking-tighter sm:text-6xl">
            <div className="text-primary">AdisMoney</div>
            <div>
              Your Personal
              <FlipWords words={heroWords} />
              Tracker
            </div>
          </h1>

          <p className="text-center md:text-lg">
            Effortlessly track your expenses, manage your income, and gain valuable insights into your financial habits
            with our expense tracking app. Get started today!
          </p>

          <ActionButtons containerClasses="pt-2" />
        </main>
      </section>

      <section className="container w-full px-4 py-12 md:px-6 md:py-24">
        <FeatureCards />
      </section>

      <section className="w-full border-t bg-background">
        <BackgroundDotsContainer containerClassName="py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Take Control of Your Finances Today
              </h2>
              <p className="mx-auto max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Download our expense tracking app and start managing your money with ease.
              </p>
            </div>

            <ActionButtons containerClasses="flex justify-center mt-2" />
          </div>
        </BackgroundDotsContainer>
      </section>
    </>
  );
}
