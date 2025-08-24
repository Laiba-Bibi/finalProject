from api.models import Resource, Interest

# Mapping from your string codes to full Interest names in the DB
interest_map = {
    "web": "Web Development",
    "ai": "Artificial Intelligence",
    "ds": "Data Science",
}
resources = [   
  {
    "title": "Frontend Roadmap",
    "url": "https://roadmap.sh/frontend",
    "interest": "web",
    "type": "Roadmap"
  },
  {
    "title": "freeCodeCamp",
    "url": "https://www.freecodecamp.org/learn",
    "interest": "web",
    "type": "Course"
  },
  {
    "title": "MDN Web Docs",
    "url": "https://developer.mozilla.org",
    "interest": "web",
    "type": "Documentation"
  },
  {
    "title": "W3Schools",
    "url": "https://www.w3schools.com/",
    "interest": "web",
    "type": "Documentation"
  },
  {
    "title": "CS50 Web Programming",
    "url": "https://cs50.harvard.edu/web/2020/",
    "interest": "web",
    "type": "Course"
  },
  {
    "title": "The Odin Project",
    "url": "https://www.theodinproject.com/",
    "interest": "web",
    "type": "Course"
  },
  {
    "title": "Codecademy Web Dev Path",
    "url": "https://www.codecademy.com/learn/full-stack-engineer-career-path",
    "interest": "web",
    "type": "Course"
  },
  {
    "title": "JavaScript Info",
    "url": "https://javascript.info/",
    "interest": "web",
    "type": "Article"
  },
  {
    "title": "Scrimba Frontend Path",
    "url": "https://scrimba.com/learn/frontend",
    "interest": "web",
    "type": "Course"
  },
  {
    "title": "Traversy Media",
    "url": "https://www.youtube.com/c/TraversyMedia",
    "interest": "web",
    "type": "YouTube Channel"
  },
  {
    "title": "Frontend Masters",
    "url": "https://frontendmasters.com/",
    "interest": "web",
    "type": "Platform"
  },
  {
    "title": "CSS Tricks",
    "url": "https://css-tricks.com/",
    "interest": "web",
    "type": "Article"
  },
  {
    "title": "DevDocs",
    "url": "https://devdocs.io/",
    "interest": "web",
    "type": "Documentation"
  },
  {
    "title": "Web.dev by Google",
    "url": "https://web.dev/",
    "interest": "web",
    "type": "Article"
  },
  {
    "title": "React Documentation",
    "url": "https://react.dev/learn",
    "interest": "web",
    "type": "Documentation"
  },
  {
    "title": "Full Stack Open",
    "url": "https://fullstackopen.com/en/",
    "interest": "web",
    "type": "Course"
  },
  {
    "title": "Coursera Web Design for Everybody",
    "url": "https://www.coursera.org/specializations/web-design",
    "interest": "web",
    "type": "Course"
  },
  {
    "title": "AI for Everyone",
    "url": "https://www.coursera.org/learn/ai-for-everyone",
    "interest": "ai",
    "type": "Course"
  },
  {
    "title": "DeepLearning.ai",
    "url": "https://www.deeplearning.ai/",
    "interest": "ai",
    "type": "Platform"
  },
  {
    "title": "Fast.ai Course",
    "url": "https://course.fast.ai/",
    "interest": "ai",
    "type": "Course"
  },
  {
    "title": "Stanford CS221: AI",
    "url": "https://cs221.stanford.edu/",
    "interest": "ai",
    "type": "Course"
  },
  {
    "title": "Elements of AI",
    "url": "https://www.elementsofai.com/",
    "interest": "ai",
    "type": "Course"
  },
  {
    "title": "Google AI",
    "url": "https://ai.google/",
    "interest": "ai",
    "type": "Platform"
  },
  {
    "title": "Microsoft Learn AI",
    "url": "https://learn.microsoft.com/en-us/training/paths/build-ai-solutions-with-azure/",
    "interest": "ai",
    "type": "Course"
  },
  {
    "title": "OpenAI Cookbook",
    "url": "https://github.com/openai/openai-cookbook",
    "interest": "ai",
    "type": "Documentation"
  },
  {
    "title": "MIT Introduction to Deep Learning",
    "url": "http://introtodeeplearning.com/",
    "interest": "ai",
    "type": "Course"
  },
  {
    "title": "OpenAI Blog",
    "url": "https://openai.com/blog",
    "interest": "ai",
    "type": "Article"
  },
  {
    "title": "Towards AI",
    "url": "https://towardsai.net/",
    "interest": "ai",
    "type": "Article"
  },
  {
    "title": "KDNuggets AI Articles",
    "url": "https://www.kdnuggets.com/",
    "interest": "ai",
    "type": "Article"
  },
  {
    "title": "Data Science Roadmap",
    "url": "https://roadmap.sh/data-science",
    "interest": "ds",
    "type": "Roadmap"
  },
  {
    "title": "Kaggle Learn",
    "url": "https://www.kaggle.com/learn",
    "interest": "ds",
    "type": "Course"
  },
  {
    "title": "IBM Data Science",
    "url": "https://www.coursera.org/professional-certificates/ibm-data-science",
    "interest": "ds",
    "type": "Certification"
  },
  {
    "title": "DataCamp",
    "url": "https://www.datacamp.com/",
    "interest": "ds",
    "type": "Platform"
  },
  {
    "title": "Harvard Data Science",
    "url": "https://cs109.github.io/2022/",
    "interest": "ds",
    "type": "Course"
  },
  {
    "title": "CS50: Introduction to Data Science",
    "url": "https://cs50.harvard.edu/ai/2020/",
    "interest": "ds",
    "type": "Course"
  },
  {
    "title": "UC San Diego Data Science",
    "url": "https://www.edx.org/professional-certificate/uc-san-diegox-data-science",
    "interest": "ds",
    "type": "Certification"
  },
  {
    "title": "Springboard Data Science Career Track",
    "url": "https://www.springboard.com/courses/data-science-career-track/",
    "interest": "ds",
    "type": "Course"
  },
  {
    "title": "Analytics Vidhya",
    "url": "https://www.analyticsvidhya.com/",
    "interest": "ds",
    "type": "Article"
  },
  {
    "title": "StatQuest with Josh Starmer",
    "url": "https://www.youtube.com/user/joshstarmer",
    "interest": "ds",
    "type": "YouTube Channel"
  },
  {
    "title": "Mode Analytics SQL Tutorial",
    "url": "https://mode.com/sql-tutorial/",
    "interest": "ds",
    "type": "Tutorial"
  },
  {
    "title": "Data Science Central",
    "url": "https://www.datasciencecentral.com/",
    "interest": "ds",
    "type": "Article"
  }
];

for res in resources:
    interest_name = interest_map[res["interest"]]
    try:
        interest_string = interest_name  # Just use the string
        Resource.objects.get_or_create(
    title=res["title"],
    url=res["url"],
    type=res["type"],  # Use dynamic type
    interest=interest_string
)
    except Interest.DoesNotExist:
        print(f"❌ Interest '{interest_name}' not found in DB. Please seed it first.")

print("Resources seeded ✅")