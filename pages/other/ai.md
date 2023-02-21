- [ ] 回答"出图发灰如何解决"并加入qq群705197383

## stable diffusion

webui

stable diffusion

controlNet

pt, tag, lora

[秋葉aaaki](https://space.bilibili.com/12566101?spm_id_from=333.337.0.0): b站AI普及大佬, qq群705197383, 进群需回答一个问题, 出图发灰如何解决

- 2023/2/16: [疯先生A的视频](https://www.bilibili.com/video/BV1yx4y1V7xQ/?buvid=XU533A35E3466B6DF33D0A6D2D43D6ABD518D&is_story_h5=false&mid=xnTWXFnN3%2FdCR1nMGCTwgw%3D%3D&p=1&plat_id=116&share_from=ugc&share_medium=android&share_plat=android&share_session_id=72f99fc8-de34-492a-a81b-8fd1f5e0d3b9&share_source=COPY&share_tag=s_i&timestamp=1676237661&unique_k=coL1siK&up_id=12138147&vd_source=d35104e25b715af4e6b17b07b9f092b5), 生成电锯人真实感的人物

[civitai](https://civitai.com)

[controlNet](https://github.com/lllyasviel/ControlNet)

图片信息: 反向解析图片为生成参数

- 模型: 后缀ckpt, safetensors, 名字带vae为美化模型, 一般要架子啊模型的vae解决出图发灰问题
  - basil_mix_fixed
  - chilloutmix
  - dosmix
  - final-prune
  - kotosAbyssproto_v10
  - schollmax25d
  - stLouisLuxuriousWheels_v1
  - vae_schoolmax
- 生成方式
  - text2Img: 正向tag, 反向tag
  - img2Img
- 采样方式, 采样步数
- 分辨率: 一般 768*1024 竖向图
- 生成批次, 每批数量
- 随机种
- 额外网络层(lora插件)
- 美术风格脚本

扩展: 安装lora扩展, 以下是常用插件
- Tag自动补全
- sd-webui-additional-networks
- 美术风格梯度
- 图库浏览器
- 简体中文语言包
- 词元分析器(tokenizer)
- LDSR
- Lora
- ScuNET
- SwinlR
- prompt-bracket-checker 

naifu novelai 美学embedding 训练

[NovelAI最终版webui版百度网盘下载地址](https://pan.baidu.com/s/1nb99Lnl_erplncUZRXThFg), 提取码为r3f7
1. 打开文件夹中`A点我生成你得启动脚本.bat`文件生成启动脚本
2. 打开`A启动脚本.bat`文件启动软件

更新遇到网络问题: 需dev-sidecar解决

## dive into deep learning