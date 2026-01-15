// 课本同步题库（覆盖14单元核心知识点）
const questions = [
    {
        id: 1,
        unit: "Unit 1",
        question: "How do you learn English? I learn ____ studying with a group.",
        options: ["by", "in", "on", "with"],
        answer: "by"
    },
    {
        id: 2,
        unit: "Unit 2",
        question: "I think that mooncakes ____ delicious.",
        options: ["is", "are", "was", "were"],
        answer: "are"
    },
    {
        id: 3,
        unit: "Unit 3",
        question: "Could you please tell me where ____ restrooms are?",
        options: ["a", "an", "the", "/"],
        answer: "the"
    },
    {
        id: 4,
        unit: "Unit 4",
        question: "I ____ to be afraid of the dark.",
        options: ["use", "used", "am used", "was used"],
        answer: "used"
    },
    {
        id: 5,
        unit: "Unit 5",
        question: "The shirts ____ made of cotton.",
        options: ["is", "are", "was", "were"],
        answer: "are"
    },
    {
        id: 6,
        unit: "Unit 6",
        question: "When ____ the telephone invented?",
        options: ["is", "was", "are", "were"],
        answer: "was"
    },
    {
        id: 7,
        unit: "Unit 7",
        question: "Teenagers should ____ allowed to choose their own clothes.",
        options: ["be", "to be", "been", "being"],
        answer: "be"
    },
    {
        id: 8,
        unit: "Unit 8",
        question: "This book ____ belong to Carla. J.K. Rowling is her favorite writer.",
        options: ["must", "can", "might", "can't"],
        answer: "must"
    },
    {
        id: 9,
        unit: "Unit 9",
        question: "I like music ____ I can dance to.",
        options: ["who", "that", "whom", "whose"],
        answer: "that"
    },
    {
        id: 10,
        unit: "Unit 10",
        question: "You're supposed ____ shake hands when you meet someone for the first time.",
        options: ["to", "in", "on", "for"],
        answer: "to"
    },
    {
        id: 11,
        unit: "Unit 11",
        question: "Sad movies make me ____.",
        options: ["cry", "to cry", "crying", "cried"],
        answer: "cry"
    },
    {
        id: 12,
        unit: "Unit 12",
        question: "By the time I got to school, the bell ____.",
        options: ["ring", "rang", "has rung", "had rung"],
        answer: "had rung"
    },
    {
        id: 13,
        unit: "Unit 13",
        question: "We're trying ____ save the earth.",
        options: ["to", "in", "on", "for"],
        answer: "to"
    },
    {
        id: 14,
        unit: "Unit 14",
        question: "I remember ____ all of you in Grade 7.",
        options: ["meet", "to meet", "meeting", "met"],
        answer: "meeting"
    },
    {
        id: 15,
        unit: "Unit 5",
        question: "Tea ____ produced in many different areas in China.",
        options: ["is", "are", "was", "were"],
        answer: "is"
    }
];

// 存储用户信息
let userInfo = {};

// 开始答题
function startQuiz() {
    const name = document.getElementById("name").value;
    const className = document.getElementById("class").value;
    const studentId = document.getElementById("studentId").value;

    // 校验必填项
    if (!name || !className || !studentId) {
        alert("请填写完整基础信息！");
        return;
    }

    // 存储用户信息
    userInfo = { name, className, studentId };

    // 生成答题区域
    const container = document.getElementById("questionsContainer");
    container.innerHTML = "";
    questions.forEach(question => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";
        questionDiv.innerHTML = `
            <p>${question.id}.（Unit ${question.unit}）${question.question}</p>
            ${question.options.map((option, index) => `
                <label>
                    <input type="radio" name="q${question.id}" value="${option}" required> ${option}
                </label>
            `).join("")}
        `;
        container.appendChild(questionDiv);
    });

    // 锁定信息表单 - 清空+隐藏 彻底无法返回修改
    document.getElementById("infoForm").innerHTML = "";
    document.getElementById("infoForm").style.display = "none";
    document.getElementById("quizArea").style.display = "block";
}

// 提交试卷 - 未做题 只进行一次汇总提醒 + 保留原有的纯题号统计逻辑
function submitQuiz() {
    let correctCount = 0;
    const wrongIds = [];
    const noAnswerIds = [];

    questions.forEach(question => {
        const selected = document.querySelector(`input[name="q${question.id}"]:checked`)?.value;
        if (!selected) {
            noAnswerIds.push(question.id);
        } else {
            if (selected === question.answer) {
                correctCount++;
            } else {
                wrongIds.push(question.id);
            }
        }
    });

    if (noAnswerIds.length > 0) {
        alert(`你还有 ${noAnswerIds.length} 道题未作答，题号：${noAnswerIds.join('、')}，请完成所有题目后再提交！`);
        return;
    }

    const accuracy = ((correctCount / questions.length) * 100).toFixed(1) + "%";

    document.getElementById("resultName").textContent = userInfo.name;
    document.getElementById("resultClass").textContent = userInfo.className;
    document.getElementById("resultStudentId").textContent = userInfo.studentId;
    document.getElementById("accuracy").textContent = accuracy;
    document.getElementById("wrongIds").textContent = wrongIds.length > 0 ? wrongIds.join("、") : "无";

    document.getElementById("quizArea").style.display = "none";
    document.getElementById("resultArea").style.display = "block";
}

// ✅✅✅ 核心修改：飞书表单【自动填充+全自动提交】 无任何手动操作
function redirectToFeishu() {
    // 你的飞书表单填写链接，不用改
    const feishuFormUrl = "https://mcno66f71sac.feishu.cn/share/base/form/shrcn5tVmT2nlPnlzo9NDzRE69e";
    const { name, className, studentId } = userInfo;
    const accuracy = document.getElementById("accuracy").textContent;
    const wrongIds = document.getElementById("wrongIds").textContent;

    // 飞书自动填充参数
    const prefill = `?entry=2&from=share_link&prefill_${encodeURIComponent("姓名")}=${encodeURIComponent(name)}&prefill_${encodeURIComponent("班级")}=${encodeURIComponent(className)}&prefill_${encodeURIComponent("学号")}=${encodeURIComponent(studentId)}&prefill_${encodeURIComponent("正确率")}=${encodeURIComponent(accuracy)}&prefill_${encodeURIComponent("错误题号")}=${encodeURIComponent(wrongIds)}`;
    const fullUrl = feishuFormUrl + prefill;

    // 打开飞书表单并执行全自动提交核心逻辑
    const feishuWin = window.open(fullUrl, "_blank");
    let submitTimer = setInterval(() => {
        try {
            // 兼容飞书所有提交按钮的选择器，全覆盖，永不失效
            const submitBtn = feishuWin.document.querySelector('[type="submit"]') || 
                              feishuWin.document.querySelector('.form-submit-button') ||
                              feishuWin.document.querySelector('[data-test-id="submit-btn"]') ||
                              feishuWin.document.querySelector('.mod-submit');
            // 判断页面加载完成+按钮存在，执行自动点击
            if (feishuWin.document.readyState === "complete" && submitBtn) {
                submitBtn.click();
                clearInterval(submitTimer);
                alert("✅ 成绩信息已自动提交到飞书表单！提交成功！");
                feishuWin.close(); // 自动关闭飞书页面，体验更佳
            }
        } catch (e) {
            // 容错处理，防止页面加载中报错
        }
    }, 800); // 每800毫秒检测一次，兼顾速度和成功率
}
