---
outline: deep
---

# 通道点位配置


![11](../../../../images/Setting/Configuration/channel/11.png)
![12](../../../../images/Setting/Configuration/channel/12.png)

1. 通过点击想要查看的通道行**Operation**列的**Points**按钮，打开点位弹框。

2. 点位类型的切换标签按钮，分别有**telemetry**、**signal**、**control**、**adjustment**，对应通道点位的四遥分类。点击展示对应类型下的点位。
3. 视图模式切换：视图分为**Points（点位）**和**Mappings（点位映射）**，点击对应的按钮进行视图切换。
4. 点击**Batch Publish**按钮可进行批量数值下发操作。
5. 点击**Operation**列的**Publish**按钮可进行单个点位的数值下发操作。
6. 点击**Export**按钮把当前tab页下面的表格数据以**.csv**的格式进行导出。
7. 点击**Edit**按钮进入对点位的编辑模式。
8. 点击**Cancel**按钮关闭弹框。
9. 点位筛选框，可以手动输入进行点位名称的模糊搜索或者通过下拉框对点位名称的选择进行精准搜索。

![13](../../../../images/Setting/Configuration/channel/13.png)
通过视图切换滑块到**mappings**后，页面解析如下：

10. 点击tab切换点位的类型，对点位映射的查看。
11. 点击**Export**按钮，以**.csv**的格式导出当前点位类型中的表格数据。
12. 点击**Edit**按钮进入对点位映射的编辑模式。
13. 点击**Cancel**按钮关闭弹框。

## 下发点位的值

下发点位的值有两种方式：**批量下发**和**单点下发**。

### 单点下发



![14](../../../../images/Setting/Configuration/channel/14.png)

![15](../../../../images/Setting/Configuration/channel/15.png)

![16](../../../../images/Setting/Configuration/channel/16.png)

1. 点击所要下发值的点位行的**Publish**按钮，打开单点下发值弹框。

2. 在Value的输入框中进行下发值的输入（对于**telemetry**、**adjustment**而言，下发值为数字；对于**signal**、**control**而言，下发值为0或者1）。
3. 点击**Submit**按钮进行值的单点下发提交。
4. 点击**Cancel**按钮取消对值的单点下发。
5. 下发成功，值发生改变。

### 批量下发

![17](../../../../images/Setting/Configuration/channel/17.png)

![18](../../../../images/Setting/Configuration/channel/18.png)

![19](../../../../images/Setting/Configuration/channel/19.png)

1. 点击所要批量下发的点位类型页面的**Batch Publish**按钮，进行批量下发操作（只针对当前点位类型）。

2. 在表格中的**Publish**中对下发值进行填入（对于**telemetry**、**adjustment**而言，下发值为数字；对于**signal**、**control**而言，下发值为0或者1）。
3. 点击**Submit Publish**按钮，进行批量值下发的提交。
4. 点击**Cancel Publish**按钮，取消批量值下发的操作。
5. 下发成功，值发生改变。

## 批量修改点位

![20](../../../../images/Setting/Configuration/channel/20.png)

1. 点击点位视图中的Edit按钮，进入对所有点位的编辑模式。

![21](../../../../images/Setting/Configuration/channel/21.png)

2. 针对修改过程中的增删改操作，可以通过筛选条件进行筛选（只针对与单个点位类型表格）：

- **modified**：对进行了实际修改的点位进行筛选，修改后的点位记录左侧显示为蓝色，修改后的数据标为蓝色。
  ![22](../../../../images/Setting/Configuration/channel/22.png)
- **added**：对通过新增操作添加的点位进行筛选，新增的点位记录左侧以及数据显示为绿色。
  ![23](../../../../images/Setting/Configuration/channel/23.png)
- **deleted**：对通过删除操作删除的点位进行筛选，删除的点位记录的左侧以及数据显示为红色。
  ![24](../../../../images/Setting/Configuration/channel/24.png)
- **invalid**：对通过增加、修改后存在问题的点位进行筛选，存在问题的点位记录的左侧显示为橙色，背景显示为暗红色。
  ![25](../../../../images/Setting/Configuration/channel/25.png)
  点位配置规则：
- `point_id`：正整数（必填，不可重复）
- `signal_name`：字符串，禁止包含空格（必填）
- `scale`：数值（必填）
- `offset`：数字（必填）
- `unit`：字符串（选填）
- `reverse`：true/false（必填）

> **注意：对于点位的修改遵循批量修改原则，即先在本地进行修改，在全部修改完毕并且没有错误出现的前提下，点击Submit按钮才能真正地修改通道 点位中地点位数据，对于后续的mappings的修改也是如此。**

### 通过文件导入点位信息

![26](../../../../images/Setting/Configuration/channel/26.png)

1. 点击**Import**按钮，选择**.csv格式**的点位文件进行导入，根据不同的点位类型，对文件格式内容有以下要求：

* telemetry/adjustment

  - 期望表头**(必须包含以下表头信息，其他额外表头也可以存在，但是并不会起作用)**：

    `point_id,signal_name,scale,offset,unit,reverse`

  - 字段说明：遵循点位配置规则要求。

  - 格式截图：

    <img src="../../../../images/Setting/Configuration/channel/27.png" alt="27" style="zoom: 33%;" />

* signal/control

  * 期望表头(必须包含以下表头信息，其他额外表头也可以存在，但是并不会起作用)：

    `point_id,point_name,reverse`

  * 字段说明：遵循点位配置规则要求。

  * 格式截图：
  
    <img src="../../../../images/Setting/Configuration/channel/27(1).png" alt="27(1)" style="zoom: 33%;" />

>**注意：**
>
>- **所有导入的记录将作为“新增”渲染（绿色高亮），即使存在校验错误也会导入，但会标记为“invalid”以便你在界面修正。**
>- **每次导入会整体覆盖当前的点位信息。**

### 新增点位

![28](../../../../images/Setting/Configuration/channel/28.png)

1. 点击**新增图标**按钮，在对应点位类型表格中的第一行出现可填写的点位行记录。
2. 对可填写行进行内容填写，遵循配置规则。
3. 点击**√图标**按钮，完成对填写的点位的本地新增。
4. 点击**×图标**按钮，取消对于填写点位的本地新增。
5. 确认新增后点位记录的样式如图所示，可以通过”**added**“筛选条件进行筛选。

> **注意：在新增过程中，每个tab中最多只支持对一个点位的新增，即只会出现一个新增行，只有在点击确认图标或者取消图标之后，才可以再次进行新增行的添加。如果已有新增行没有实现确认或者取消操作，再次点击新增按钮，不会有新增行的出现。**

### 删除点位

![29](../../../../images/Setting/Configuration/channel/29.png)

1. 点击所要删除行的**删除图标**按钮，实现点位的本地删除。
2. 本地删除后的点位记录的样式如图所示，可以通过”**delected**“筛选条件进行筛选。
3. 可以点击删除行后的复原图标按钮进行复原，此时会撤销本地的删除操作。

### 修改点位

![30](../../../../images/Setting/Configuration/channel/30.png)

1. 点击所要修改的点位的**修改图标**按钮对点位进行修改。
2. 依照点位的配置规则，对点位进行修改，对已有点位进行修改的时候，不可以修改id。
3. 如果是对新增的点位进行修改，则是可以修改id的。
4. 点击**确认图标**按钮，本地保存对点位的修改。
5. 点击**取消图标**按钮，取消本次对点位的修改。
6. 本地修改后的点位记录样式如图所示，其会把修改的数据使用蓝色进行标记。可以通过“**modified**”筛选条件进行筛选。

### 提交所有修改

![31](../../../../images/Setting/Configuration/channel/31.png)

1. 在提交时必须保证修改的点位数据没有问题，错误提示会出现在错误数据下方。
2. 点击**Submit**按钮进行批量修改提交。
3. 点击**Cancel Edit**按钮，退出修改，点位表展示初始值。

> **注意：无需手动进行查询，直接点击Submit按钮之后，若有问题可以直接进行跳转。**

## 导出点位CSV文件

![32](../../../../images/Setting/Configuration/channel/32.png)

点击**Export**按钮，可以实现对当前tab下面的表格数据进行导出，导出格式为**.csv**，文件名称为：**通道的名称+tab名称（telemetry/signal/control/adjustment）+当前时间戳**。
