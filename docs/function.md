---
outline: deep
---

### 组件内置方法示例

#### 内置方法可以在组件初始化后，根据实际业务需要对组件进行查询、修改等操作。
 
| 方法名 | 参数                                               | 返回值 | 描述                                                      |
| --- |--------------------------------------------------|-----|---------------------------------------------------------|
| getData() | -                                                | -   | 发送请求获取表格数据并返回                                           |
| getTableData() | -                                                | -   | 获取当前表格数据                                                |
| setCurrentPagination() | page                                             | -   | 设置分页，传入页数                                               |
| getCurrentPagination() |                                                  | -   | 获取当前分页                                                  |
| getTotalPagination() |                                                  | -   | 获取总页数                                                   |
| tableReset() |                                                  | -   | 表格重置                                                    |
| setTableParams() | {}                                               | -   | 设置当前table查询参数，传入需要设置的参数对象                               |
| getSearch() | {}                                               | -   | 调用搜索接口，传入查询参数对象                                         |
| validateSearch() | {}                                               | -   | 校验搜索参数                                                  |
| resetSearch() | {}                                               | -   | 重置搜索                                                    |
| getFormState() | {}                                               | -   | 获取当前表单值                                                 |
| getFormRefData() | {}                                               | -   | 获取当前表单 构建数据                                             |
| setFormVisible() | true/false                                       | -   | 设置表单显示隐藏                                                |
| handleFormShow() | type: insert/update/show/check, formState: 当前表单值 | -   | 设置表单状态，比如自定义表格行数据编辑可以调用这个，handleFormShow('update', row) |
| getResetFormData() |                                                  | -   | 获取当前form 初始化时的数据                                        |
| getSearchResetForm() |                                                  | -   | 获取当前search 初始化时的数据                                      |
| getSearchParams() |                                                  | -   | 获取当前search数据                                            |
| setSearchParams() | {}                                               | -   | 设置当前search查询参数                                          |
| mergeFormResetParams() | {}                                               | -   | 传入一个对象，将传入的对象与原来的form 初始化时的数据合并                         |
| mergeFormData() | {}                                               | -   | 传入一个对象，将传入的对象与原来的form当前的数据合并                            |
| handleFormSubmit() | {}                                               | -   | 调用当前表单保存接口，可以传入一个对象参数，参数会与当前form表单数据合并，并提交到接口           |
| handleFormCancel() | {}                                               | -   | 调用当前表单退出方法                                              |
| mergeSearchResetParams() | {}                                               | -   | 传入一个对象，将传入的对象与原来的search 初始化时的参数合并                       |
| mergeSearchParams() | {}                                               | -   | 传入一个对象，将传入的对象与原来的search 当前的参数合并                         |
| setTableColumns() | {}                                               | -   | 传入一个对象，动态设置table column                                 |
| mergeTableProps() | {}                                               | -   | 传入一个对象，数组格式为table.ts中的columns配置，可以覆盖初始化时table的参数        |
| setFormData() | []                                               | -   | 传入一个数组，数组格式为form.ts中的表单项配置，可以覆盖初始化时表单项的配置               |
| setSearchFormData() | []                                               | -   | 传入一个数组，数组格式为search.ts中的表单项配置，可以覆盖初始化时表单项的配置             |

 
