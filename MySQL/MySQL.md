# MySQL

库 表 字段 大写

SQL语句执行顺序

1. from子句
2. where子句
3. group by子句
4. select 子句
5. having子句
6. order by 子句
7. limit子句



## MySQL的使用

### 1.启动和停止服务

+ 图形化方式

  + “我的电脑/计算机”-->右键-->“管理”-->“服务”-->启动和关闭MySQL
  + “开始菜单”-->“控制面板”-->“管理工具”-->“服务”-->启动和关闭MySQL
  + “任务管理器”-->“服务”-->启动和关闭MySQL

+ 命令行（管理员身份）

  ```powershell
  net start MySQ服务名
  net stop 	MySQ服务名
  ```



### 2.客户端登录

```powershell
mysql -h主机名 -P端口号 -u用户名 -p密码
```

如果连本机，则`-hlocalhost`可以省略；如果端口还没有修改，则-P3306可以省略。



## 基础查询

### 1.查询函数

（调用函数获取返回值)

```mysql
SELECT DATABASE();
SELECT VERSION();
SELECT USER();
SELECT ISNULL(表达式1,表达式2); 
#表达式1:可能为null的字段或表达式 
#表达式2:如果表达式1位null,则最终结果显示的值
SELECT LENGTH(str)
```

### 2.别名

```mysql
SELECT last_name AS 姓名 FROM `emp`;
SELECT last_name AS '姓 名' FROM `emp`; #别名中包含特殊字符应用''包起来
SELECT last_name  '姓 名' FROM `emp`; #使用空格实现相同效果
```

### 3.字符串拼接

MySQL中`+`的作用只有**`加法运算`**

+ 两个操作数都是数值型
+ 其中一个操作数为字符型，将字符型数据强制转为数值型，无法转换则转为`0`
+ 其中一个操作数为`null`则结果为`null`

`concat`方法如果其中一个字符串为`null`则最终结果为`null`

```mysql
SELECT CONCAT(first_name,last_name) AS '姓 名' FROM `employee`
```

```mysql
SELECT CONCAT(first_name,' ',IFNULL(last_name,'空')) FROM `employee`
```

### 4.去重

```mysql
SELECT DISTINCT `job_id`  FROM `employees`;
```

### 5.查看表结构

```mysql
DESC `employees`;
SHOW COLUMNS FROM `employees`;
```

### 6.条件查询

+ 关系表达式 
  + = 只能判断普通的内容，无法判断null
  + &gt;
  + <   
  + &gt;=   
  + <=   
  + !=  或 <> 
  + <=> 安全等于 既能判断普通内容，也能判断null

+ 逻辑表达式  
  + and 
  + or 
  + not 

### 7.模糊查询

+ like

  通配符

  + _任意单个字符
  + %任意0个或多个字符

  设置转义字符，默认为`\`

  ```mysql
  SELECT * FROM employees WHERE last_name LIKE '__$_%' ESCAPE '$'
  ```

+ in

+ between ... and ...

+ is null 、is not null

### 8.排序

ASC 升序 默认

DESC 降序

按单个字段排序

```mysql
SELECT * FROM `employees` WHERE `employee_id`>120 ORDER BY `salary` 
SELECT * FROM `employees` WHERE `employee_id`>120 ORDER BY `salary` ASC
SELECT * FROM `employees` WHERE `employee_id`>120 ORDER BY `salary` DESC
```

按表达式排序

```mysql
  SELECT 
    *,
    `salary` * 12 *(1+ IFNULL(`commission_pct`, 0)) AS 'nianxin' 
  FROM
    `employees` 
  WHERE `commission_pct` IS NOT NULL 
  ORDER BY `salary` * 12* (1+ IFNULL(`commission_pct`, 0)) DESC 
```

按别名排序

```mysql
#因为where在select前执行所以不能用别名进行条件查询
SELECT 
  *,
  `salary` * 12 * (1+ IFNULL(`commission_pct`, 0)) AS 'nianxin' 
FROM
  `employees` 
WHERE `commission_pct` IS NOT NULL 
ORDER BY 'nianxin' DESC 
```

按函数的结果排序

```mysql
SELECT LENGTH(last_name),last_name FROM `employees` ORDER BY LENGTH(`last_name`)
```

多个字段排序

```mysql
select `last_name`,`salary`,`department_id` from `employees` order by `salary` ,`department_id` DESC;
```

按列数排序

```mysql
SELECT * FROM `employees` ORDER BY 2 desc;
```

## 常见函数

### 1.字符函数

```mysql
#CONCAT拼接字符
SELECT CONCAT('hello,',first_name,last_name) 备注 FROM `employees`;

#LENGTH 获取字节长度
SELECT LENGTH('hello,张三'); #12

#CHAR_LENGTH 获取字符长度
SELECT CHAR_LENGTH('hello,张三'); #8

#SUBSTR 截取一定长度的字符串,SQL字符串起始索引为1
SELECT SUBSTR('一二三四五六七八',1,5);

#INSTR 获取字符第一次出现的索引
SELECT INSTR('一二三四五六七','一');

#TRIM 去除前后指定的字符,默认去空格
SELECT TRIM('  12 3   ') AS 'str';
SELECT TRIM( 'A' FROM 'AAA12a3aaAA') AS 'str';
# 去掉字符串str2开头处的str1
select trim(leading 'A' from 'AAA12a3aaAA') ;
# 去掉字符串str2结尾处的str1
select trim(trailing 'A' from 'AAA12a3aaAA') ;
#LPAD/RPAD 左填充/右填充
SELECT LPAD('123',10,'a');
SELECT RPAD('123',10,'a');

#UPPER/LOWER

#STRCMP 比较两个字符大小
SELECT STRCMP('anc','aec');

#LEFT(str,n)/RIGHT(str,n) 返回字符串str最左/右的n个字符
```

```mysql
SELECT 
  CONCAT(
    UPPER(SUBSTR(`first_name`, 1, 1)),
    LOWER(SUBSTR(`first_name`, 2)),
    '_',
    UPPER(last_name)
  )
  AS 'OUTPUT'
  FROM `employees`;
```

### 2.数学函数

```mysql
#ABS 绝对值
#CEIL 向上取整
#FLOOR 向下取整
#ROUND 四舍五入 第二个参数表示小数点后位数
#TRUNCATE(x,y) 返回数字x截断为y位小数的结果
#MOD(num1,num2) 取余 num1%num2 被除数正负决定结果正负
```

### 3.日期函数

```mysql
#NOW() 返回当前系统日期时间
#CURDATE() 只获取年月日
#CURTIME 只获取时间
#DATEDIFF 日期差 天数
#DATE_FORMAT(datetime,fmt) 按照字符串fmt格式化日期datetime值
SELECT DATE_FORMAT('1001-1-1','%Y年%m月%d日 %H小时%i分钟%s秒');

#STR_TO_DATE 按指定格式解析字符串为日期类型
SELECT STR_TO_DATE('3/15 1995','%m/%d %Y');
SELECT 
  * 
FROM
  `employees` 
WHERE `hiredate` < STR_TO_DATE('3/15 1995', '%m/%d %Y') ;
```

| 格式符 | 说明                                                        | 格式符 | 说明                                                        |
| ------ | :---------------------------------------------------------- | ------ | ----------------------------------------------------------- |
| %Y     | 4位数字表示年份                                             | %y     | 表示两位数字表示年份                                        |
| %M     | 月名表示月份（January,....）                                | %m     | 两位数字表示月份（01,02,03。。。）                          |
| %b     | 缩写的月名（Jan.，Feb.，....）                              | %c     | 数字表示月份（1,2,3,...）                                   |
| %D     | 英文后缀表示月中的天数（1st,2nd,3rd,...）                   | %d     | 两位数字表示月中的天数(01,02...)                            |
| %e     | 数字形式表示月中的天数（1,2,3,4,5.....）                    |        |                                                             |
| %H     | 两位数字表示小数，24小时制（01,02..）                       | %h和%I | 两位数字表示小时，12小时制（01,02..）                       |
| %k     | 数字形式的小时，24小时制(1,2,3)                             | %l     | 数字形式表示小时，12小时制（1,2,3,4....）                   |
| %i     | 两位数字表示分钟（00,01,02）                                | %S和%s | 两位数字表示秒(00,01,02...)                                 |
| %W     | 一周中的星期名称（Sunday...）                               | %a     | 一周中的星期缩写（Sun.，Mon.,Tues.，..）                    |
| %w     | 以数字表示周中的天数(0=Sunday,1=Monday....)                 |        |                                                             |
| %j     | 以3位数字表示年中的天数(001,002...)                         | %U     | 以数字表示年中的第几周，（1,2,3。。）其中Sunday为周中第一天 |
| %u     | 以数字表示年中的第几周，（1,2,3。。）其中Monday为周中第一天 |        |                                                             |
| %T     | 24小时制                                                    | %r     | 12小时制                                                    |
| %p     | AM或PM                                                      | %%     | 表示%                                                       |

### 4.流程控制函数

```mysql
#IF函数
SELECT IF(100>9,'1','2')
SELECT 
  IF(
    `commission_pct` IS NULL,
    0,
    `salary` * 12 * `commission_pct`
  ) 'output' 
FROM
  `employees`;

#CASE函数
CASE 表达式
WHEN 值1 THEN 结果1
WHEN 值2 THEN 结果2
...
ELSE 结果n
END

SELECT `department_id`,`salary`,
CASE `department_id`
WHEN 30 THEN `salary`*2
WHEN 40 THEN `salary`*3
WHEN 50 THEN `salary`*4
ELSE `salary`
END 'newsalary' 
FROM `employees`;

CASE 
WHEN 条件1 THEN 结果1
WHEN 条件2 THEN 结果2
...
ELSE 结果n
END

SELECT 
  `salary`,
  CASE
    WHEN `salary` > 20000 
    THEN 'A' 
    WHEN `salary` > 10000 
    THEN 'c' 
    WHEN `salary` > 2000 
    THEN 'b' 
    ELSE 'D' 
  END 'grade' 
FROM
  `employees` ;
```

### 5.聚合函数

进行纵向运算的函数

```mysql
SUM(字段名)求和
AVG()求平均
MAX()求最大值
MIN()求最小值
COUNT()计算非空字段值的个数 COUNT(*) 统计结果集中总行数
SELECT SUM(`salary`),AVG(`salary`),MAX(`salary`),MIN(`salary`),COUNT(`salary`) FROM `employees`;
SELECT COUNT(DISTINCT `department_id`) FROM `employees`;

```

## 复杂查询

### 1.分组查询

```mysql
SELECT SUM(`salary`) ,`department_id` FROM `employees` GROUP BY `department_id`;

#分组前筛选 WHERE 
SELECT MAX(`salary`) 最高工资,`department_id`
FROM `employees`
WHERE `email` LIKE '%a%'
GROUP BY `department_id`;

#分组后筛选
SELECT 
  COUNT(*) 员工个数,
  `department_id` 
FROM
  `employees` 
GROUP BY `department_id` 
HAVING COUNT(*)>5;

SELECT `job_id`,MAX(`salary`)
FROM `employees`
WHERE `commission_pct` IS NOT NULL
GROUP BY `job_id`
HAVING MAX(`salary`)>12000;

#多个字段分组
SELECT MIN(`salary`) 最低工资,`job_id`,`department_id`
FROM `employees`
GROUP BY `job_id`,`department_id`;
```

DQL语法

```mysql
SELECT 
selection_list /*要查询的列名称*/
FROM 
table_list /*要查询的表名称*/
WHERE 
condition /*行条件 分组前筛选,只能根据原始表进行筛选*/
GROUP BY 
grouping_columns /*对结果分组*/
HAVING 
condition /*分组后的行条件 执行在group by 后,基于结果集表进行筛选*/
ORDER BY
sorting_columns /*对结果分组*/
LIMIT 
offset_start, row_count /*结果限定*/
```

### 2.连接查询

功能分类

+ 内连接
  + 等值连接
  + 非等值连接
  + 自连接
+ 外连接
  + 左外连接
  + 右外连接
  + 全外连接
+ 交叉连接

#### 内连接

##### 等值连接

+ 多表等值连接的结果为多表的交集部分
+ n表连接至少需要n-1个连接条件
+ 多表的顺序没有要求
+ 一般需要为表起别名

```mysql
#表1的关联列=表2的关联列
SELECT `name`,`boyName`
FROM `beauty`,`boys`
WHERE `beauty`.`boyfriend_id`=`boys`.`id`;

#特点
1.为了解决多表中的字段名重复问题,往往为表起别名,提高语义
2.表的顺序无要求

#①简单的两表链接
SELECT `last_name`,`department_name`
FROM `employees` e,`departments` d
WHERE e.`department_id`=d.`department_id`;
#起别名后不能用原始表明限定字段
SELECT e.`last_name`,d.`department_name`
FROM `employees` e,`departments` d
WHERE e.`department_id`=d.`department_id`;

#②添加筛选条件
案例1：查询部门编号>100的部门名和所在的城市名
SELECT `department_name`,`city`
FROM `departments` d,`locations` l
WHERE d.`location_id`=l.`location_id`
AND d.`department_id`>100;

#③添加分组+筛选
#案例1：查询每个城市的部门个数
SELECT COUNT(*) 部门个数,1.`city`
FROM `departments` d,`locations` l
WHERE d.`location_id`=l.`location_id`
GROUP BY l.`city`;
#案例2：查询有奖金的每个部门的部门名和部门的领导编号和该部门的最低工资
SELECT `department_name`,d.`manager_id`,MIN(`salary`)
FROM `departments` d,`employees` e
WHERE d.`department_id`=e.`department_id`
AND `commission_pct` IS NOT NULL
GROUP BY `department_id`,d.`manager_id`;

# 三表查询
# 案例 : 查询员工名 部门名所在城市
SELECT `last_name`,`department_name`,`city`
FROM `employees` e,`departments` d,`locations` l
WHERE e.`department_id`=d.`department_id`
AND d.`location_id`=l.`location_id`;
```

##### 非等值连接

```mysql
#案例 查询与昂的工资和工资级别
SELECT `salary`,`grade_level`
FROM `employees` e,`job_grades` g
WHERE `salary` BETWEEN g.`lowest_sal` AND g.`highest_sal`;
```

##### 自连接

```mysql
# 案例 : 查询员工名和上级的名称
SELECT e.`employee_id`,e.`last_name`,m.`employee_id`,m.`last_name`
FROM `employees` e,`employees` m
WHERE e.`manager_id`=m.`employee_id`;
```

#### 外连接

查询结果为主表中所以记录,如果从表有匹配项,则显示

如果没有匹配项则显示null

特点

1. 外连接分主从表且顺序不能任意调换
2. 左连接则左边为主表，右连接则右边为主表

```mysql
select 查询列表
from 表1 别名
left|right|full outer join 表2 别名
on 连接条件
where 筛选条件;
```

```mysql
SELECT b.`name`
FROM `beauty` b
LEFT JOIN `boys` bo ON b.`boyfriend_id`=bo.`id`
WHERE bo.`id` IS NULL;
```



