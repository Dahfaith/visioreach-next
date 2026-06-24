require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function addProject() {
  const project = {
    title: "CreatorKit Africa",
    description: "A premium, multi-tenant link-in-bio and portfolio builder designed specifically for African creators. Engineered with a glassmorphism design system and automated revenue splitting via Flutterwave Subaccounts.",
    category: "web",
    github_url: "https://github.com/Dahfaith/creatorkit-africa",
    live_url: "https://creatorkit-africa.vercel.app",
    image_url: "/images/creatorkit.png"
  };

  const { data, error } = await supabase.from('projects').insert([project]);
  if (error) {
    console.error("Error inserting project:", error);
  } else {
    console.log("Successfully inserted CreatorKit Africa!");
  }
}

addProject();
