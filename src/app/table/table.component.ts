import { Component, OnInit } from '@angular/core';
export interface TreeNodeInterface {
  id: number;
  name: string;
  state: string;
  createtime: string;
  endtime: string;
  person: number;
  personstate: string;
  expand: boolean;
  children?: TreeNodeInterface[];
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  groundList: any = [
    { name: '一级组' },
    { name: '级组' },
    { name: '组状态' },
    { name: '创建时间' },
    { name: '到期时间' },
    { name: '组内人员' },
    { name: '人员状态' }
  ];
  selectIndex: Number;
  expandDataCache = {};
  data = [
    {
      id: 1,
      name: '企业部管理',
      state: 'active',
      createtime: '2018-01-01 12:15',
      endtime: '2018-01-01 12:15',
      person: 2,
      personstate: '无',
      children: [
        {
          id: 11,
          name: '部门一',
          state: 'active',
          createtime: '2018-01-01 12:15',
          endtime: '2018-01-01 12:15',
          person: 2,
          personstate: '无',
          children: [
            {
              id: 15,
              name: '小组一',
              state: 'active',
              createtime: '2018-01-01 12:15',
              endtime: '2018-01-01 12:15',
              person: 2,
              personstate: '无',
              children: [
                {
                  id: 20,
                  name: '王二',
                  state: 'active',
                  createtime: '2018-01-01 12:15',
                  endtime: '2018-01-01 12:15',
                  person: 2,
                  personstate: '无',
                  children: [
                    {
                      id: 34,
                      name: '王二',
                      state: 'active',
                      createtime: '2018-01-01 12:15',
                      endtime: '2018-01-01 12:15',
                      person: 2,
                      personstate: '无',
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 13,
          name: '部门二',
          state: 'active',
          createtime: '2018-01-01 12:15',
          endtime: '2018-01-01 12:15',
          person: 2,
          personstate: '无',
          children: [
            {
              id: 24,
              name: '小组一',
              state: 'active',
              createtime: '2018-01-01 12:15',
              endtime: '2018-01-01 12:15',
              person: 2,
              personstate: '无',
              children: [
                {
                  id: 89,
                  name: '王二',
                  state: 'active',
                  createtime: '2018-01-01 12:15',
                  endtime: '2018-01-01 12:15',
                  person: 2,
                  personstate: '无',
                  children: [
                    {
                      id: 234,
                      name: '王二',
                      state: 'active',
                      createtime: '2018-01-01 12:15',
                      endtime: '2018-01-01 12:15',
                      person: 2,
                      personstate: '无',
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 14,
          name: '部门三',
          state: 'active',
          createtime: '2018-01-01 12:15',
          endtime: '2018-01-01 12:15',
          person: 2,
          personstate: '无',
        }
      ],
    },
    {
      id: 2,
      name: '公共事业部',
      state: 'active',
      createtime: '2018-01-01 12:15',
      endtime: '2018-01-01 12:15',
      person: 2,
      personstate: '无',
      children: [
        {
          id: 17,
          name: '部门一',
          state: 'active',
          createtime: '2018-01-01 12:15',
          endtime: '2018-01-01 12:15',
          person: 2,
          personstate: '无',
        },
        {
          id: 19,
          name: '部门二',
          state: 'active',
          createtime: '2018-01-01 12:15',
          endtime: '2018-01-01 12:15',
          person: 2,
          personstate: '无',
        }
      ],
    },
    {
      id: 3,
      name: '云计算部',
      state: 'active',
      createtime: '2018-01-01 12:15',
      endtime: '2018-01-01 12:15',
      person: 2,
      personstate: '无',
    }
  ];

  constructor() { }

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if ($event === false) {
      // 如果收起状态，data里有children 遍历下 arr数组里与children.id相同 把他的开关target.expand全部变为false;
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.id === d.id);
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }
  convertTreeToList(root: object): TreeNodeInterface[] {
    const stack = [];
    const array = [];
    const hasMap = {};
    stack.push({ ...root, level: 0, expand: false }); // 给每条数据添加开关expand
    while (stack.length !== 0) {  // 循环判断 如果长度大于0的时候 删除最后一项 并返回；
      const node = stack.pop();
      this.visitNode(node, hasMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level + 1, expand: false, parent: node });
        }
      }
    }
    return array;
  }
  visitNode(node: TreeNodeInterface, hasMap: object, array: TreeNodeInterface[]): void {
    if (!hasMap[node.id]) {
      hasMap[node.id] = true;
      array.push(node);
    }
  }
  ngOnInit() {
    this.selectIndex = this.data[0].id;
    this.data.forEach((item) => {
      this.expandDataCache[item.id] = this.convertTreeToList(item);
    });
  }
}
