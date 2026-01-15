// 课本同步题库（覆盖14单元核心知识点，共15题）
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

// 存储用户信息
let userInfo = {};
// 实时统计答题数量
let answeredCount = 0;

// 开始答题
function startQuiz() {
    const name = document.getElementById("name").value.trim();
    const className = document.getElementById("className").value.trim();
    const studentId = document.getElementById("studentId").value.trim();

    if (!name || !className || !studentId) {
        alert("⚠️ 请填写完整的姓名、班级、学号信息，不能为空！");
        return;
    }

    userInfo = { name, className, studentId };
    answeredCount = 0;

    const container = document.getElementById("questionsContainer");
    container.innerHTML = "";
    questions.forEach(question => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";
        questionDiv.innerHTML = `
            <p>${question.id}.（${question.unit}）${question.question}</p>
            ${question.options.map((option, index) => `
                <label>
                    <input type="radio" name="q${question.id}" value="${option}" onchange="updateProgress()"> ${option}
                </label>
            `).join("")}
        `;
        container.appendChild(questionDiv);
    });

    document.getElementById("infoForm").innerHTML = "";
    document.getElementById("infoForm").style.display = "none";
    document.getElementById("quizArea").style.display = "block";
}

// 实时更新答题进度
function updateProgress() {
    answeredCount = document.querySelectorAll('input[type="radio"]:checked').length;
    document.getElementById("progressTip").textContent = `✅ 答题进度：已答 ${answeredCount} 题 / 共 15 题`;
}

// 提交试卷
function submitQuiz() {
    const allChecked = document.querySelectorAll('input[type="radio"]:checked').length;
    if (allChecked < questions.length) {
        alert(`⚠️ 你还有 ${questions.length - allChecked} 道题未作答，请答完所有题目后再提交！`);
        const firstUnanswered = document.querySelector('input[type="radio"]:not(:checked)').closest('.question');
        firstUnanswered.scrollIntoView({ behavior: "smooth" });
        return;
    }

    alert("📝 正在判分，请稍候...");

    let correctCount = 0;
    const wrongIds = [];

    questions.forEach(question => {
        const selected = document.querySelector(`input[name="q${question.id}"]:checked`)?.value;
        if (selected === question.answer) {
            correctCount++;
        } else {
            wrongIds.push(question.id);
        }
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

// 核心修改：自动提交到飞书表单（无需跳转网页）
function redirectToFeishu() {
    const { name, className, studentId } = userInfo;
    const accuracy = document.getElementById("accuracy").textContent;
    const wrongIds = document.getElementById("wrongIds").textContent;

    // 飞书多维表格的提交接口（需要替换成你的真实接口）
    // 接口获取方式：飞书多维表格 → 表单设置 → 开发者工具 → 获取提交 API
    const feishuApiUrl = "https://www.feishu.cn/open-apis/bitable/v1/apps/你的APP_TOKEN/tables/你的TABLE_TOKEN/records";

    // 飞书的请求头（必须配置，否则提交失败）
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer 你的飞书应用凭证" 
    };

    // 提交的数据（字段名要和飞书表单的字段名完全一致）
    const postData = {
        fields: {
            "姓名": name,
            "班级": className,
            "学号": studentId,
            "正确率": accuracy,
            "错误题号": wrongIds
        }
    };

    // 发送自动提交请求
    fetch(feishuApiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 0) {
            alert("✅ 数据已自动同步到飞书！无需手动提交");
            document.getElementById("syncSuccess").style.display = "block";
        } else {
            alert(`❌ 同步失败：${data.msg}，请联系管理员`);
        }
    })
    .catch(error => {
        alert("❌ 网络异常，同步失败！");
        console.error("飞书提交错误： - script.js:146", error);
    });
}
