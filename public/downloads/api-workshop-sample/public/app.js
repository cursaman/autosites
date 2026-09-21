const form = document.querySelector("#ask-form");
const messageInput = document.querySelector("#message");
const answer = document.querySelector("#answer");
const resultSection = answer.closest("section");
const button = form.querySelector("button");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  button.disabled = true;
  answer.textContent = "AI가 답변을 만드는 중입니다…";
  resultSection.setAttribute("aria-busy", "true");

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: messageInput.value }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "요청에 실패했습니다.");
    answer.textContent = data.answer;
  } catch (error) {
    answer.textContent = `오류: ${error.message}`;
  } finally {
    button.disabled = false;
    resultSection.setAttribute("aria-busy", "false");
  }
});
