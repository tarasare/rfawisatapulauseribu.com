import React from "react";
import { motion } from "framer-motion";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar.jsx";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    feedback:
      "Amazing experience! The islands were breathtaking and the tour was exceptionally well-organized. The guides were knowledgeable and friendly. Highly recommend RFA Wisata!",
    avatar: "SJ",
    location: "Jakarta",
  },
  {
    name: "Michael Chen",
    rating: 5,
    feedback:
      "Perfect getaway from the city! Crystal clear waters, beautiful pristine beaches, and incredibly friendly guides. The snorkeling was absolutely fantastic. Will definitely come back!",
    avatar: "MC",
    location: "Surabaya",
  },
  {
    name: "Amanda Rodriguez",
    rating: 5,
    feedback:
      "Unforgettable adventure! The snorkeling experience was incredible with vibrant coral reefs and colorful fish. The sunset views were absolutely stunning. Best vacation ever!",
    avatar: "AR",
    location: "Bandung",
  },
  {
    name: "David Kim",
    rating: 5,
    feedback:
      "Best vacation experience! The islands are truly paradise on earth and the service was exceptional from start to finish. Professional team and amazing destinations. Five stars all the way!",
    avatar: "DK",
    location: "Bali",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          Customer Testimonials
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          Hear what our happy travelers have to say about their unforgettable
          experiences with RFA Wisata
        </p>

        <div className="relative w-full max-w-4xl mx-auto aspect-video overflow-hidden rounded-2xl border border-border/60 shadow-sm mb-12">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/2W2SsOyh4pI"
            title="RFA Wisata Pulau Seribu"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary text-white font-semibold">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                "{testimonial.feedback}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
