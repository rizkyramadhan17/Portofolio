const profileData = {
    name: "Rizky Ramadhan Wardono",
    shortName: "Rizky Ramadhan",
    role: "UI/UX Designer, Developer & Data Analyst",
    location: "Jakarta Selatan, Indonesia",
    status: "Available for Projects & Collaboration",
    email: "rizkyramadhab05@gmail.com",
    phone: "0812-8367-2709",
    linkedin: "https://linkedin.com/in/rizky-ramadhan-wardono-507518286",
    bio: "Mahasiswa Sistem Informasi yang berfokus menciptakan pengalaman digital yang intuitif, aplikasi web fungsional, dan visualisasi data yang bernilai analitis tinggi."
};

const statsData = [
    {
        id: "stat-1",
        label: "Featured Projects",
        value: 3,
        suffix: "+",
        description: "Curated works across Web, Data & Design"
    },
    {
        id: "stat-2",
        label: "Data Points Analyzed",
        value: 114,
        suffix: "K+",
        description: "Spotify music tracks & metrics processed"
    },
    {
        id: "stat-3",
        label: "Core Disciplines",
        value: 4,
        suffix: "",
        description: "UI/UX, Web Dev, Analytics & Graphic Design"
    },
    {
        id: "stat-4",
        label: "Dedication & Passion",
        value: 100,
        suffix: "%",
        description: "Committed to quality & detail in every build"
    }
];

const projectCategories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Development" },
    { id: "data", label: "Data Analytics" },
    { id: "design", label: "Graphic Design" }
];

const projects = [
    {
        id: "warung-sembako",
        title: "Warung Sembako Sugeng",
        subtitle: "Interactive E-Commerce & Sembako Store",
        category: "web",
        categoryLabel: "Web Development",
        badge: "College Project",
        image: "warung_sembako.png",
        link: "warung-sembako.html",
        hasLiveDemo: true,
        tags: ["HTML5", "CSS3", "JavaScript", "E-Commerce", "Responsive Design", "WhatsApp API"],
        description: "Website e-commerce katalog sembako interaktif berbasis web untuk mempermudah warga belanja kebutuhan dapur sehari-hari dengan navigasi cepat, kategori lengkap, dan integrasi pemesanan langsung ke WhatsApp.",
        highlights: [
            "15+ item sembako siap pesan dengan stok live badge",
            "Desain retro-modern yang user-friendly dan responsif di mobile",
            "Checkout otomatis terhubung ke WhatsApp pesan"
        ]
    },
    {
        id: "spotify-analytics",
        title: "Spotify Tracks Data Analytics Dashboard",
        subtitle: "Music Popularity & Audio Features Intelligence",
        category: "data",
        categoryLabel: "Data Analytics",
        badge: "Business Intelligence",
        image: "spotify_dashboard.png",
        link: null,
        hasLiveDemo: false,
        tags: ["Power BI", "DAX", "Data Modeling", "Scatter Plot", "Donut Chart", "Data Storytelling"],
        description: "Dashboard analitik interaktif berbasis Power BI yang mengeksplorasi lebih dari 114.000 lagu di Spotify. Menemukan korelasi audio danceability terhadap popularitas, perbandingan top artist dan genre, serta distribusi lagu eksplisit.",
        highlights: [
            "Eksplorasi 114K total lagu, 31K artis, dan 114 genre musik",
            "Analisis korelasi Danceability vs Popularity dengan scatter matrix",
            "Visualisasi distribusi explicit vs clean tracks (8.6% explicit)"
        ]
    },
    {
        id: "cluckory-branding",
        title: "Cluckory Brand Identity & Pre-Order Campaign",
        subtitle: "Contemporary F&B Visual Identity & Marketing",
        category: "design",
        categoryLabel: "Graphic Design",
        badge: "Branding Design",
        image: "cluckory.png",
        link: null,
        hasLiveDemo: false,
        tags: ["Brand Identity", "Packaging Design", "Social Media Kit", "Typography", "Visual Marketing"],
        description: "Perancangan identitas visual lengkap dan materi kampanye Open Pre-Order untuk brand F&B Cluckory, mengedepankan tone visual yang dinamis, modern, dan menggugah selera audiens muda.",
        highlights: [
            "Desain packaging dan materi promosi visual terpadu",
            "Penerapan color palette hangat dan tipografi berkarakter",
            "Optimalisasi layout untuk promosi media sosial berkonversi tinggi"
        ]
    }
];

const disciplines = [
    {
        id: "001",
        name: "UI/UX Design",
        icon: "🎨",
        description: "Merancang antarmuka yang elegan, berorientasi pengguna, dan intuitif melalui riset flow dan prototyping.",
        tags: ["Figma", "User Journey", "Wireframing", "Interactive Prototype", "Design System"]
    },
    {
        id: "002",
        name: "Web Development",
        icon: "💻",
        description: "Membangun website modern yang cepat, responsif, dan interaktif menggunakan teknologi web terkini.",
        tags: ["HTML5 & CSS3", "Modern JavaScript (ES6+)", "Responsive Layouts", "MySQL", "Git & GitHub"]
    },
    {
        id: "003",
        name: "Data Analytics",
        icon: "📊",
        description: "Mengolah dan memvisualisasikan data mentah menjadi wawasan bisnis yang actionable melalui dashboard interaktif.",
        tags: ["Power BI", "DAX Formulas", "Data Visualization", "Data Modeling", "Business Intelligence"]
    },
    {
        id: "004",
        name: "Graphic Design",
        icon: "✨",
        description: "Menciptakan identitas visual yang kuat, materi promosi berdampak tinggi, dan estetika layout yang menarik.",
        tags: ["Branding Identity", "Layout Design", "Poster & Banner", "Typography", "Visual Assets"]
    }
];
