import {
  创建默认学习计划,
  格式化课程,
  取第一项,
} from "./ts语法案例";

const TypeScript学习计划 = 创建默认学习计划();
const 进阶课程列表 = TypeScript学习计划.查询课程("进阶");
const 第一门进阶课程 = 取第一项(进阶课程列表);

console.log("TypeScript 中文语法案例");
console.log(`计划总时长：${TypeScript学习计划.计算总时长()} 分钟`);

if (第一门进阶课程) {
  console.log(`第一门进阶课程：${格式化课程(第一门进阶课程)}`);
}
