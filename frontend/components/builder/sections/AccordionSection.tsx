import { Accordion as AccordionAtom } from '../atoms/Accordion';
import { EditableText } from '../atoms/EditableText';

export interface AccordionSectionProps {
  id?: string;
  title?: string;
  items?: { title: string; content: string }[];
  backgroundColor?: string;
  titleColor?: string;
  itemTitleColor?: string;
  itemContentColor?: string;
  accentColor?: string;
  padding?: string;
}

export const AccordionSection = ({
  id = '',
  title = 'Frequently Asked Questions',
  items = [
    { title: 'What are the admission requirements?', content: 'Admission is based on previous academic records and an entrance test for specific grades.' },
    { title: 'What is the fee structure for 2026?', content: 'The fee structure varies by grade. Please download the prospectus from the downloads section.' },
    { title: 'Do you provide school transport?', content: 'Yes, we have a fleet of 20 buses covering all major parts of the city.' },
  ],
  backgroundColor = '#09090b',
  titleColor = '#ffffff',
  itemTitleColor = '#ffffff',
  itemContentColor = '#a1a1aa',
  accentColor = '#6366f1',
  padding = '5rem 1.5rem',
}: AccordionSectionProps) => {
  return (
    <section style={{ background: backgroundColor, padding }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 
          className="font-bold mb-12 text-center"
          style={{ color: titleColor, fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}
        >
          <EditableText id={id} propKey="title" value={title} />
        </h2>
        <AccordionAtom items={items.map((item, idx) => ({
          title: (
            <span style={{ color: itemTitleColor }}>
              <EditableText id={id} propKey={`items.${idx}.title`} value={item.title} />
            </span>
          ),
          content: (
            <div style={{ color: itemContentColor }}>
              <EditableText id={id} propKey={`items.${idx}.content`} value={item.content} multiline />
            </div>
          )
        }))} />
      </div>
    </section>
  );
};
