import { Quote } from 'lucide-react';
import { EditableText } from '../atoms/EditableText';

interface TestimonialProps {
  id?: string;
  quote?: string;
  author?: string;
  role?: string;
  avatar?: string;
  backgroundColor?: string;
}

export const Testimonial = ({
  id = '',
  quote = "PraiSol has completely transformed how we build websites. The speed and flexibility are unmatched.",
  author = "Jane Cooper",
  role = "CEO at TechFlow",
  avatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
  backgroundColor = '#18181b',
}: TestimonialProps) => {
  return (
    <div 
      style={{ backgroundColor }}
      className="p-8 rounded-2xl border border-zinc-800 shadow-xl flex flex-col items-center text-center max-w-2xl mx-auto"
    >
      <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
        <Quote className="text-indigo-500" size={24} />
      </div>
      
      <p className="text-xl md:text-2xl font-medium text-zinc-100 italic mb-8 leading-relaxed">
        "<EditableText id={id} propKey="quote" value={quote} multiline />"
      </p>
      
      <div className="flex flex-col items-center gap-3">
        <img 
          src={avatar} 
          alt={author} 
          className="w-14 h-14 rounded-full border-2 border-indigo-500/20 object-cover"
        />
        <div>
          <h4 className="font-bold text-white text-lg">
            <EditableText id={id} propKey="author" value={author} />
          </h4>
          <p className="text-zinc-500 text-sm font-medium">
            <EditableText id={id} propKey="role" value={role} />
          </p>
        </div>
      </div>
    </div>
  );
}
