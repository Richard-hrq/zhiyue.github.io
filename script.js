 const API_KEY = 'sk-2XUs5xNw6rNVUMEWudZaTDQkyqQ4xL2F2f30JETstjZ71aji'; // 替换为你的真实API密钥
        const API_URL = 'https://api.moonshot.cn/v1/chat/completions';

        document.getElementById('qaForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const questionInput = document.getElementById('question');
            const answerEl = document.getElementById('answer');
            const submitBtn = e.target.querySelector('button');

            // 清空旧答案
            answerEl.textContent = '';
            
            // 输入验证
            const question = questionInput.value.trim();
            if (!question) {
                alert('请输入有效问题');
                return;
            }

            try {
                // 禁用按钮防止重复提交
                submitBtn.disabled = true;
                submitBtn.textContent = '提交中...';

                // 直接调用API（临时方案）
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_KEY}`
                    },
                    body: JSON.stringify({
                        model: "moonshot-v1-8k",
                        messages: [{ role:"system",content:"你是一位温柔理性的人生导师，以循循善诱的方式提供指导。回答时，语气要亲切、温暖，像与朋友聊天般自然，同时富有智慧和耐心。注重倾听用户的问题，从不同角度分析，引导用户自己思考，给出建设性建议，帮助用户找到解决问题的方向，让对方感受到被理解和支持。" },
                                   { role: "user", content: question }],
                        temperature: 0.3
                    })
                });

                // 处理HTTP错误
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`API错误: ${errorData.error?.message || response.status}`);
                }

                // 解析结果
                const data = await response.json();
                answerEl.textContent = data.choices[0].message.content;

            } catch (error) {
                console.error('Error:', error);
                answerEl.textContent = `请求失败：${error.message}`;
            } finally {
                // 恢复按钮状态
                submitBtn.disabled = false;
                submitBtn.textContent = '提交';
            }
        });
