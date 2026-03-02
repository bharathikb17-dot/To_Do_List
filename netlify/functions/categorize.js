exports.handler = async function (event) {
  try {
    const { text } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Categorize the task into one word: Work, Study, Shopping, Health, Personal, Social, or Other."
          },
          {
            role: "user",
            content: text
          }
        ]
      })
    });

    const data = await response.json();

    const category =
      data.choices?.[0]?.message?.content?.trim() || "Other";

    return {
      statusCode: 200,
      body: JSON.stringify({ category })
    };

  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({ category: "Other" })
    };
  }
};
