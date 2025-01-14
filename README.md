# 浏览器玩游戏
目前实现游戏：
- 扫雷
- 1024
# 浏览器控制台玩扫雷
上班摸鱼使用浏览器F12 Console控制台进行扫雷游戏操作。  
既然有敲键盘的动作又有停留片刻的思考，让周围同事和领导感觉你在工作。(喜欢的话请给star)    
github地址 [https://github.com/dearDreamWeb/browser_console_minesweeper_gird](https://github.com/dearDreamWeb/browser_console_minesweeper_gird)  
![](https://raw.githubusercontent.com/dearDreamWeb/picture/main/others/browser_console_minesweeper_gird_4.png)  
![](https://raw.githubusercontent.com/dearDreamWeb/picture/main/others/browser_console_minesweeper_gird_5.png)

# 玩法操作
```
mines.help() 查看帮助文档
mines.start() 开始游戏
mines.nextStep(row,col): 下一步。两个参数: row:第几行;col:第几列。从0开始计数
mines.setSettings(rows,cols,mines): 设置参数，三个参数: rows:生成的行数;cols:生成的列数;mines:生成的地雷数
mines.logGrid(): 当前状态
```

# 浏览器控制台玩1024游戏
经典的1024游戏。
# 玩法
```
game1024.help() 查看帮助文档
game1024.start() 开始游戏
game1024.nextStep(direction): 下一步。direction: w向上；s向下；a向左；d向右
game1024.logGrid(): 当前状态
```

# 使用方式
## 第一种
最简单粗暴，把[index.js](./index.js)中的代码复制粘贴到Console中就能使用了。

## 第二种方式
使用`Sources`中的 `Snippets` 添加外挂的js程序，将[index.js](./index.js)代码复制进去之后，右键 `Run`运行即可。  
好处：配置一次可以在所有页面中使用  
步骤：  
- 第一步
![](https://raw.githubusercontent.com/dearDreamWeb/picture/main/others/browser_console_minesweeper_gird_1.png) 
- 第二步 
![](https://raw.githubusercontent.com/dearDreamWeb/picture/main/others/browser_console_minesweeper_gird_2.png)  
- 第三步
![](https://raw.githubusercontent.com/dearDreamWeb/picture/main/others/browser_console_minesweeper_gird_3.png)

## 第三种方式
将[tampermonkey.txt](./tampermonkey.txt)的内容添加到油猴脚本中，添加想要应用的网站上地址即可。（match字段对应匹配的网站地址）
