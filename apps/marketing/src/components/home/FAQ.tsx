import { cn } from "@pt/ui/cn";
import { useTranslations } from "next-intl";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@pt/ui/collapsible";
import { ChevronDown } from "lucide-react";

export function FAQ({ className }: { className?: string }) {
  const t = useTranslations();

  const items = [
    {
      question: "What is the refund policy?",
      answer:
        "We offer a 30-day money-back guarantee if you're not happy with our product.",
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription by visiting the billing page.",
    },
    {
      question: "Can I change my plan?",
      answer:
        "Yes, you can change your plan at any time by visiting the billing page.",
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, we offer a 14-day free trial.",
    },
  ];

  if (!items) {
    return null;
  }

  return (
    <section
      className={cn("scroll-mt-20 border-t py-12 lg:py-16", className)}
      id='faq'
    >
      <div className='container max-w-3xl'>
        <div className='mb-12 lg:text-center'>
          <h2 className='mb-6 text-center text-3xl font-bold'>
            {t("faq.title")}
          </h2>
          <p className='text-lg opacity-50'>{t("faq.description")}</p>
        </div>
        <div className='grid grid-cols-1 gap-2'>
          {items.map((item, i) => (
            <Collapsible
              key={`faq-item-${i}`}
              className='group rounded-lg border p-4 lg:p-6'
            >
              <CollapsibleTrigger className='flex w-full items-center justify-between'>
                <h4 className='font-semibold text-lg text-left'>
                  {item.question}
                </h4>
                <ChevronDown className='h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180' />
              </CollapsibleTrigger>
              <CollapsibleContent className='mt-2'>
                <p className='text-foreground/60'>{item.answer}</p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
        {/* <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {items.map((item, i) => (
            <div key={`faq-item-${i}`} className='rounded-lg border p-4 lg:p-6'>
              <h4 className='mb-2 font-semibold text-lg'>{item.question}</h4>
              <p className='text-foreground/60'>{item.answer}</p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
