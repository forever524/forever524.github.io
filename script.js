const questions = [
    { id: 1, unit: "Unit 1", question: "How do you learn English? I learn ____ studying with a group.", options: ["by", "in", "on", "with"], answer: "by" },
    { id: 2, unit: "Unit 2", question: "I think that mooncakes ____ delicious.", options: ["is", "are", "was", "were"], answer: "are" },
    { id: 3, unit: "Unit 3", question: "Could you please tell me where ____ restrooms are?", options: ["a", "an", "the", "/"], answer: "the" },
    { id: 4, unit: "Unit 4", question: "I ____ to be afraid of the dark.", options: ["use", "used", "am used", "was used"], answer: "used" },
    { id: 5, unit: "Unit 5", question: "The shirts ____ made of cotton.", options: ["is", "are", "was", "were"], answer: "are" },
    { id: 6, unit: "Unit 6", question: "When ____ the telephone invented?", options: ["is", "was", "are", "were"], answer: "was" },
    { id: 7, unit: "Unit 7", question: "Teenagers should ____ allowed to choose their own clothes.", options: ["be", "to be", "been", "being"], answer: "be" },
    { id: 8, unit: "Unit 8", question: "This book ____ belong to Carla. J.K. Rowling is her favorite writer.", options: ["must", "can", "might", "can't"], answer: "must" },
    { id: 9, unit: "Unit 9", question: "I like music ____ I can dance to.", options: ["who", "that", "whom", "whose"], answer: "that" },
    { id: 10, unit: "Unit 10", question: "You're supposed ____ shake hands when you meet someone for the first time.", options: ["to", "in", "on", "for"], answer: "to" },
    { id: 11, unit: "Unit 11", question: "Sad movies make me ____.", options: ["cry", "to cry", "crying", "cried"], answer: "cry" },
    { id: 12, unit: "Unit 12", question: "By the time I got to school, the bell ____.", options: ["ring", "rang", "has rung", "had rung"], answer: "had rung" },
    { id: 13, unit: "Unit 13", question: "We're trying ____ save the earth.", options: ["to", "in", "on", "for"], answer: "to" },
    { id: 14, unit: "Unit 14", question: "I remember ____ all of you in Grade 7.", options: ["meet", "to meet", "meeting", "met"], answer: "meeting" },
    { id: 15, unit: "Unit 5", question: "Tea ____ produced in many different areas in China.", options: ["is", "are", "was", "were"], answer: "is" }
];
let userInfo = {};

function startQuiz() {
    const name = document.getElementById("name").value;
    const className = document.getElementById("class").value;
    const studentId = document.getElementById("studentId").value;
    if (!name || !className || !studentId) { alert("请填写完整基础信息！"); return; }
    userInfo = { name, className, studentId };
    const container = document.getElementById("questionsContainer");
    container.innerHTML = "";
    questions.forEach(question => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";
        questionDiv.innerHTML = `<p>${question.id}.（Unit ${question.unit}）${question.question}</p>${question.options.map((option) => `<label><input type="radio" name="q${question.id}" value="${option}" required> ${option}</label>`).join("")}`;
        container.appendChild(questionDiv);
    });
    document.getElementById("infoForm").innerHTML = "";
    document.getElementById("infoForm").style.display = "none";
    document.getElementById("quizArea").style.display = "block";
}

function submitQuiz() {
    let correctCount = 0;
    const wrongIds = [];
    questions.forEach(question => {
        const selected = document.querySelector(`input[name="q${question.id}"]:checked`)?.value;
        if (selected === question.answer) correctCount++;
        else wrongIds.push(question.id);
    });
    const accuracy = ((correctCount / questions.length) * 100).toFixed(1) + "%";
    document.getElementById("resultName").textContent = userInfo.name;
    document.getElementById("resultClass").textContent = userInfo.className;
    document.getElementById("resultStudentId").textContent = userInfo.studentId;
    document.getElementById("accuracy").textContent = accuracy;
    document.getElementById("wrongIds").textContent = wrongIds.length > 0 ? wrongIds.join("、") : "无";
    document.getElementById("quizArea").style.display = "none";
    document.getElementById("resultArea").style.display = "block";
}

function redirectToFeishu() {
    const { name, className, studentId } = userInfo;
    const accuracy = document.getElementById("accuracy").textContent;
    const wrongIds = document.getElementById("wrongIds").textContent;
    // ↓↓↓ 只需要把这行换成你的飞书新表表单链接 ↓↓↓
    const feishuNewTableUrl = "你的飞书新数据表表单视图链接";
    
    const submitUrl = `${feishuNewTableUrl}?&姓名=${encodeURIComponent(name)}&班级=${encodeURIComponent(className)}&学号=${encodeURIComponent(studentId)}&正确率=${encodeURIComponent(accuracy)}&错误题号=${encodeURIComponent(wrongIds)}`;
    fetch(submitUrl, { method: 'GET' });
    alert('✅ 答题数据已自动同步到飞书新数据表！数据不可修改，提交成功！');
}
