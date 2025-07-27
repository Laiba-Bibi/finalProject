from api.models import TechField, SkillCategory, SubSkill

print("Loading Skill Matrix with full names...")

# --------------------------
# TechField: Web Development
# --------------------------
web = TechField.objects.create(name="Web Development")

frontend = SkillCategory.objects.create(name="Front-End Development", field=web)
backend = SkillCategory.objects.create(name="Back-End Development", field=web)
database = SkillCategory.objects.create(name="Database Management", field=web)
version_control = SkillCategory.objects.create(name="Version Control Systems", field=web)
ui_ux_design = SkillCategory.objects.create(name="User Interface and User Experience Design", field=web)
responsive_design = SkillCategory.objects.create(name="Responsive Design", field=web)
performance_optimization = SkillCategory.objects.create(name="Web Performance Optimization", field=web)
devops_practices = SkillCategory.objects.create(name="Development and Operations Practices", field=web)
cloud_services = SkillCategory.objects.create(name="Cloud Computing Services", field=web)
cybersecurity = SkillCategory.objects.create(name="Cybersecurity Practices", field=web)
soft_skills_web = SkillCategory.objects.create(name="Professional Soft Skills", field=web)

SubSkill.objects.bulk_create([
    SubSkill(name="HyperText Markup Language (HTML)", category=frontend, importance="High"),
    SubSkill(name="Cascading Style Sheets (CSS)", category=frontend, importance="High"),
    SubSkill(name="JavaScript Programming Language", category=frontend, importance="High"),
    SubSkill(name="React JavaScript Library", category=frontend, importance="High"),
    SubSkill(name="Angular JavaScript Framework", category=frontend, importance="High"),

    SubSkill(name="Node.js JavaScript Runtime", category=backend, importance="High"),
    SubSkill(name="PHP Programming Language", category=backend, importance="High"),
    SubSkill(name="Python Programming Language", category=backend, importance="High"),
    SubSkill(name="Ruby on Rails Web Framework", category=backend, importance="High"),

    SubSkill(name="Structured Query Language (SQL)", category=database, importance="High"),
    SubSkill(name="NoSQL Databases", category=database, importance="High"),
    SubSkill(name="Firebase Backend Platform", category=database, importance="High"),

    SubSkill(name="Git Version Control", category=version_control, importance="High"),
    SubSkill(name="GitHub Repository Hosting Service", category=version_control, importance="High"),

    SubSkill(name="Figma Design Tool", category=ui_ux_design, importance="Medium"),
    SubSkill(name="Sketch Design Software", category=ui_ux_design, importance="Medium"),
    SubSkill(name="Adobe XD User Experience Design Tool", category=ui_ux_design, importance="Medium"),

    SubSkill(name="Bootstrap Front-End Framework", category=responsive_design, importance="High"),
    SubSkill(name="CSS Flexbox Layout", category=responsive_design, importance="High"),
    SubSkill(name="Responsive Media Queries", category=responsive_design, importance="High"),

    SubSkill(name="Google Lighthouse Performance Tool", category=performance_optimization, importance="Medium"),
    SubSkill(name="Google PageSpeed Insights", category=performance_optimization, importance="Medium"),

    SubSkill(name="Continuous Integration and Continuous Delivery (CI/CD)", category=devops_practices, importance="Medium"),
    SubSkill(name="Docker Containerization Platform", category=devops_practices, importance="Medium"),

    SubSkill(name="Amazon Web Services (AWS)", category=cloud_services, importance="High"),
    SubSkill(name="Microsoft Azure Cloud Platform", category=cloud_services, importance="High"),
    SubSkill(name="Google Cloud Platform (GCP)", category=cloud_services, importance="High"),

    SubSkill(name="Secure Coding Practices", category=cybersecurity, importance="High"),
    SubSkill(name="Open Web Application Security Project (OWASP) Guidelines", category=cybersecurity, importance="High"),

    SubSkill(name="Effective Communication Skills", category=soft_skills_web, importance="Medium"),
    SubSkill(name="Problem-Solving Ability", category=soft_skills_web, importance="Medium"),
])

# --------------------------
# TechField: Data Science
# --------------------------
data_science = TechField.objects.create(name="Data Science")

programming_languages_ds = SkillCategory.objects.create(name="Programming Languages for Data Science", field=data_science)
statistical_analysis_ds = SkillCategory.objects.create(name="Statistical Analysis Methods", field=data_science)
data_manipulation_ds = SkillCategory.objects.create(name="Data Manipulation Tools", field=data_science)
machine_learning_techniques_ds = SkillCategory.objects.create(name="Machine Learning Techniques", field=data_science)
data_visualization_ds = SkillCategory.objects.create(name="Data Visualization Tools", field=data_science)
big_data_ds = SkillCategory.objects.create(name="Big Data Technologies", field=data_science)
soft_skills_ds = SkillCategory.objects.create(name="Professional Soft Skills", field=data_science)

SubSkill.objects.bulk_create([
    SubSkill(name="Python Programming Language", category=programming_languages_ds, importance="High"),
    SubSkill(name="R Programming Language", category=programming_languages_ds, importance="High"),
    SubSkill(name="Hypothesis Testing Methods", category=statistical_analysis_ds, importance="High"),
    SubSkill(name="A/B Testing Techniques", category=statistical_analysis_ds, importance="High"),
    SubSkill(name="Pandas Python Library", category=data_manipulation_ds, importance="High"),
    SubSkill(name="Structured Query Language (SQL)", category=data_manipulation_ds, importance="High"),
    SubSkill(name="Supervised Machine Learning", category=machine_learning_techniques_ds, importance="High"),
    SubSkill(name="Unsupervised Machine Learning", category=machine_learning_techniques_ds, importance="High"),
    SubSkill(name="Tableau Data Visualization Tool", category=data_visualization_ds, importance="Medium"),
    SubSkill(name="Microsoft Power BI", category=data_visualization_ds, importance="Medium"),
    SubSkill(name="Hadoop Big Data Framework", category=big_data_ds, importance="Medium"),
    SubSkill(name="Apache Spark Big Data Engine", category=big_data_ds, importance="Medium"),
    SubSkill(name="Effective Communication Skills", category=soft_skills_ds, importance="Medium"),
    SubSkill(name="Problem-Solving Ability", category=soft_skills_ds, importance="Medium"),
    SubSkill(name="Leadership Skills", category=soft_skills_ds, importance="Medium"),
    SubSkill(name="Teamwork and Collaboration", category=soft_skills_ds, importance="Medium"),
])

# --------------------------
# TechField: Artificial Intelligence
# --------------------------
artificial_intelligence = TechField.objects.create(name="Artificial Intelligence")

programming_languages_ai = SkillCategory.objects.create(name="Programming Languages for AI", field=artificial_intelligence)
machine_learning_algorithms_ai = SkillCategory.objects.create(name="Machine Learning Algorithms", field=artificial_intelligence)
data_manipulation_ai = SkillCategory.objects.create(name="Data Manipulation Tools", field=artificial_intelligence)
statistical_analysis_ai = SkillCategory.objects.create(name="Statistical Analysis Methods", field=artificial_intelligence)
natural_language_processing_ai = SkillCategory.objects.create(name="Natural Language Processing", field=artificial_intelligence)
model_evaluation_ai = SkillCategory.objects.create(name="Model Evaluation Techniques", field=artificial_intelligence)
ethics_ai = SkillCategory.objects.create(name="Ethical Considerations in AI", field=artificial_intelligence)
soft_skills_ai = SkillCategory.objects.create(name="Professional Soft Skills", field=artificial_intelligence)

SubSkill.objects.bulk_create([
    SubSkill(name="Python Programming Language", category=programming_languages_ai, importance="High"),
    SubSkill(name="R Programming Language", category=programming_languages_ai, importance="High"),
    SubSkill(name="Java Programming Language", category=programming_languages_ai, importance="High"),
    SubSkill(name="Decision Tree Algorithms", category=machine_learning_algorithms_ai, importance="High"),
    SubSkill(name="Artificial Neural Networks", category=machine_learning_algorithms_ai, importance="High"),
    SubSkill(name="Support Vector Machine Algorithms", category=machine_learning_algorithms_ai, importance="High"),
    SubSkill(name="Pandas Python Library", category=data_manipulation_ai, importance="High"),
    SubSkill(name="NumPy Python Library", category=data_manipulation_ai, importance="High"),
    SubSkill(name="Structured Query Language (SQL)", category=data_manipulation_ai, importance="High"),
    SubSkill(name="Probability Theory", category=statistical_analysis_ai, importance="High"),
    SubSkill(name="Hypothesis Testing Methods", category=statistical_analysis_ai, importance="High"),
    SubSkill(name="Text Processing Techniques", category=natural_language_processing_ai, importance="Medium"),
    SubSkill(name="Sentiment Analysis Techniques", category=natural_language_processing_ai, importance="Medium"),
    SubSkill(name="Cross-Validation Methods", category=model_evaluation_ai, importance="Medium"),
    SubSkill(name="Receiver Operating Characteristic (ROC) Curves", category=model_evaluation_ai, importance="Medium"),
    SubSkill(name="Fairness in Artificial Intelligence", category=ethics_ai, importance="Medium"),
    SubSkill(name="Accountability in Artificial Intelligence", category=ethics_ai, importance="Medium"),
    SubSkill(name="Effective Communication Skills", category=soft_skills_ai, importance="Medium"),
    SubSkill(name="Problem-Solving Ability", category=soft_skills_ai, importance="Medium"),
    SubSkill(name="Leadership Skills", category=soft_skills_ai, importance="Medium"),
])

print("✅ Skill Matrix with full names loaded successfully!")
