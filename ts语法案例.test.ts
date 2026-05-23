import { expect, test } from "bun:test";

import {
  创建默认学习计划,
  格式化课程,
  课程状态,
  取第一项,
} from "./ts语法案例";

test("计算默认学习计划的总时长", () => {
  const TypeScript学习计划 = 创建默认学习计划();

  expect(TypeScript学习计划.计算总时长()).toBe(145);
});

test("按学习阶段查询课程", () => {
  const TypeScript学习计划 = 创建默认学习计划();
  const 进阶课程列表 = TypeScript学习计划.查询课程("进阶");

  expect(进阶课程列表).toHaveLength(1);
  expect(进阶课程列表[0]?.名称).toBe("接口、类型别名与联合类型");
});

test("格式化带标签的课程", () => {
  const 课程文本 = 格式化课程({
    名称: "接口、类型别名与联合类型",
    阶段: "进阶",
    时长分钟: 50,
    状态: 课程状态.学习中,
    标签: ["interface", "type", "union"],
  });

  expect(课程文本).toBe(
    "接口、类型别名与联合类型：进阶阶段，50分钟，状态为学习中，标签：interface、type、union",
  );
});

test("格式化没有标签的课程", () => {
  const 课程文本 = 格式化课程({
    名称: "泛型与类的组合使用",
    阶段: "实战",
    时长分钟: 60,
    状态: 课程状态.未开始,
  });

  expect(课程文本).toBe(
    "泛型与类的组合使用：实战阶段，60分钟，状态为未开始，标签：暂无标签",
  );
});

test("泛型函数返回列表中的第一项", () => {
  expect(取第一项(["入门", "进阶", "实战"])).toBe("入门");
  expect(取第一项<number>([])).toBeUndefined();
});
