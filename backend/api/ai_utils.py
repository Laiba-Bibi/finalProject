import subprocess

def generate_roadmap(interest, education, level):
    prompt = f"""
You are an AI assistant helping students learn specific tech fields.

💡 Focus strictly on the following:
- Interest: **{interest}**
- Education Level: {education}
- Skill Level: {level}

🧠 Generate a structured, concise learning roadmap ONLY for the selected field: **{interest}**

Do NOT include:
- Any information about other fields (e.g. if interest is AI, don't mention Web Development or Data Science).
- Platform names (like Udemy, Coursera).
- Community or networking advice.
- Job hunting tips.

✅ Format:
1. 🚀 Core Skills to Strengthen
2. 🧠 Frameworks & Libraries to Learn
3. 🛠️ Important Tools to Master
4. 📚 Suggested Learning Topics (just course TOPICS, not platforms)
5. 📈 Next Steps (project ideas, hands-on practice only)

✅ Output must be short, structured, and in Markdown bullet format.

Now, generate the roadmap ONLY for the selected field: **{interest}**
"""

    try:
        result = subprocess.run(
            ['ollama', 'run', 'tinyllama'],
            input=prompt.encode('utf-8'),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=True
        )
        return result.stdout.decode('utf-8')
    except subprocess.CalledProcessError as e:
        return f"Error: {e.stderr.decode('utf-8')}"
