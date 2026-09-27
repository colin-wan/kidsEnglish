# 🦁 Toddler Safari - 幼儿沉浸式美语启蒙乐园

专为 **2-3岁幼儿** 打造的互动式沉浸美语启蒙网页应用。参考 **Khan Academy Kids**、**Sago Mini** 幼教设计，全面深度适配 **老旧型号 iPad（iOS 12.5.8 Safari）** 与桌面浏览器。

---

## 🚀 一键部署到 GitHub（随时随地 iPad 在线访问）

为了让 iPad **无需连接电脑家庭局域网、随时随地（包括出门在外）** 都能直接打开使用，本项目提供了一键部署到 GitHub Pages 的自动化工具：

### 极速部署步骤：
1. 打开 Mac 终端，进入项目目录：
   ```bash
   cd "/Users/colin/Desktop/gemini/英文启蒙"
   ./deploy_to_github.sh
   ```
2. 按照屏幕提示输入您的 GitHub 用户名与仓库地址（如在 GitHub 上新建一个名为 `toddler-safari` 的公开仓库）。
3. 脚本会自动将所有代码与高品质音频提交推送到 GitHub。
4. **开启免费在线访问（仅需 10 秒）**：
   - 打开您的 GitHub 仓库页面。
   - 点击 **Settings (设置)** -> 左侧点击 **Pages**。
   - 在 **Branch** 下拉选择 **`main`** 分支，点击 **Save**。
   - 稍等 1 分钟，GitHub 会生成全球可访问的专属网址：
     ```text
     https://<您的GitHub用户名>.github.io/<仓库名>/
     ```
5. 在老款 iPad Safari 中打开该网址，点击“分享”->“添加到主屏幕”，即可永久免费畅玩！

---

## 🎵 Sing Songs 经典儿歌（真实人声童谣与旋律伴奏）

已彻底替换此前单调机械的语音朗读，全部升级为 **真实人声演唱、欢快悦耳乐器伴奏** 的纯正经典童谣：
- ⭐ **Twinkle Twinkle Little Star**（小星星 - 纯正温暖女声演唱）
- 🔤 **The ABC Alphabet Song**（字母歌 - 欢快活泼美式童谣演唱）
- 🚜 **Old MacDonald Had a Farm**（老麦克唐纳有个农场 - 包含真实动物叫声）
- 🚣 **Row, Row, Row Your Boat**（划小船 - 柔和水波旋律与童声合唱）

---

## 🍼 Feed Friends 动物喂养微游戏（已修复自动翻页）

- **因果关系与喂养探索**：
  - 饥饿的小动物（小猴 Milo 想要香蕉 🍌、小熊 Barnaby 想要蜂蜜 🍯、小兔 Bunny 想要胡萝卜 🥕）会发出温柔语音请求。
  - 宝宝从下方托盘点击对应食物。
- **自动翻页与正向激励**：
  - 喂对食物后，小动物会做出夸张搞笑的咀嚼动作（*“Nom nom nom! Yummy! Thank you!”*），满屏星星爆发并奖励 3 颗星星。
  - **吃饱后会自动平滑翻转至下一只等待喂食的小动物**，持续保持宝宝的注意力与新鲜感！

---

## 🌈 6 大核心启蒙主题

1. 🦁 **Animals**（动物乐园 - 8 种萌宠）
2. 🍎 **Yummy Food**（美味果蔬与日常食物）
3. 🚗 **Vehicles**（轮子与交通工具）
4. 🎨 **Colors**（彩虹色彩拟人乐园）
5. 🍼 **Feed Friends**（小动物喂食互动微游戏）
6. 🎵 **Sing Songs**（经典童谣欢唱点播台）

支持 **🌟 Explore (自由探索)**、**❓ Find (听音寻物)** 与 **🫧 Bubbles (神奇泡泡)** 三种玩法！

---

## 🖥️ 本地测试方式

本地服务正在运行中：
- 本机预览：[http://localhost:8080](http://localhost:8080)
- 局域网 iPad 预览：`http://192.168.1.35:8080`
