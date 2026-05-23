export type 学习阶段 = "入门" | "进阶" | "实战";

export enum 课程状态 {
  未开始 = "未开始",
  学习中 = "学习中",
  已完成 = "已完成",
}

export interface 课程 {
  名称: string;
  阶段: 学习阶段;
  时长分钟: number;
  状态: 课程状态;
  标签?: string[];
}

export class 学习计划 {
  private 课程列表: 课程[] = [];

  添加课程(课程信息: 课程): void {
    this.课程列表.push(课程信息);
  }

  查询课程(阶段: 学习阶段): 课程[] {
    return this.课程列表.filter((课程项) => 课程项.阶段 === 阶段);
  }

  计算总时长(): number {
    return this.课程列表.reduce(
      (总时长, 当前课程) => 总时长 + 当前课程.时长分钟,
      0,
    );
  }
}

export function 取第一项<元素类型>(
  列表: 元素类型[],
): 元素类型 | undefined {
  return 列表[0];
}

export function 格式化课程(课程信息: 课程): string {
  const 标签文本 = 课程信息.标签?.join("、") ?? "暂无标签";

  return `${课程信息.名称}：${课程信息.阶段}阶段，${课程信息.时长分钟}分钟，状态为${课程信息.状态}，标签：${标签文本}`;
}

export function 创建默认学习计划(): 学习计划 {
  const TypeScript学习计划 = new 学习计划();

  TypeScript学习计划.添加课程({
    名称: "类型注解与类型推断",
    阶段: "入门",
    时长分钟: 35,
    状态: 课程状态.已完成,
    标签: ["变量", "函数", "基础类型"],
  });

  TypeScript学习计划.添加课程({
    名称: "接口、类型别名与联合类型",
    阶段: "进阶",
    时长分钟: 50,
    状态: 课程状态.学习中,
    标签: ["interface", "type", "union"],
  });

  TypeScript学习计划.添加课程({
    名称: "泛型与类的组合使用",
    阶段: "实战",
    时长分钟: 60,
    状态: 课程状态.未开始,
  });

  return TypeScript学习计划;
}
