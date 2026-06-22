require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const existingProjects = [
  {
    title: "Alaro & Co Properties",
    description: "A premium real estate platform showcasing high-end properties. Built with optimized performance and a clean, professional standard UI for an elite client experience.",
    category: "web",
    github_url: "",
    live_url: "https://alaro-co-properties.vercel.app",
    image_url: "/images/alaro.jpg"
  },
  {
    title: "OfofoLoaded Music Platform",
    description: "A dynamic, high-performance music and media distribution platform. Features an interactive player, seamless media streaming, and robust content management.",
    category: "web",
    github_url: "",
    live_url: "https://ofofoloaded-media.vercel.app",
    image_url: "/images/ofofo.jpg"
  },
  {
    title: "Omoolopaase Spiritual Empire",
    description: "A premium cultural identity and digital showcase ecosystem. Engineered with refined grid frameworks, custom high-end assets, and intuitive digital structures.",
    category: "web",
    github_url: "https://github.com/Dahfaith/omoolopaase",
    live_url: "https://omoolopaasespiritual.com.ng",
    image_url: "/images/omoolopaase.jpg"
  },
  {
    title: "BoluAutos Sourcing Concierge",
    description: "A premium USA-to-Nigeria automotive import platform. Built with a responsive structural design and interactive multi-variable intake routing to WhatsApp.",
    category: "web",
    github_url: "https://github.com/Dahfaith/boluautos",
    live_url: "https://dahfaith.github.io/boluautos/",
    image_url: "/images/bolu1.jpg"
  },
  {
    title: "Base Digital Global Consultancy",
    description: "A high-converting legal incorporation landing page. Tailored with single-file conditional intake forms and an end-to-end data processing engine optimized for WhatsApp briefs.",
    category: "web",
    github_url: "https://github.com/Dahfaith/base-digital",
    live_url: "https://basedigitalglobal.com.ng",
    image_url: "/images/base-thumb.jpg"
  }
];

async function seed() {
  console.log("Seeding existing projects into Supabase...");
  for (const project of existingProjects) {
    const { data, error } = await supabase.from('projects').insert([project]);
    if (error) {
      console.error("Error inserting", project.title, error);
    } else {
      console.log("Inserted:", project.title);
    }
  }
  console.log("Done!");
}

seed();
