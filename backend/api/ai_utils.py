import subprocess

def generate_roadmap(interest, education, level):
    prompt = f"""
The student is exploring the field of {interest}.

The user has the following background:
- Education Level: {education}
- Current Skill Level: {level}

Based on this, generate a personalized career roadmap for the selected field.

🔹 Provide bullet-point steps grouped under these sections:

1. 🚀 Core Skills to Strengthen
2. 🧠 Frameworks & Libraries to Learn
3. 🛠️ Important Tools to Master
4. 📚 Suggested Learning Topics or Courses (no platform names, just course topics)
5. 📈 Next Steps (e.g., start project, contribute, practice X)

🚫 Do not include anything about joining communities, platforms, making accounts, or general advice.
✅ The output should change meaningfully based on interest (e.g., Web Dev vs AI vs Data Science).
✅ Keep the output concise, structured, and in plain Markdown bullet list format.
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
