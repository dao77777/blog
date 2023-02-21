# Geth

**节点分类**
- **全节点(`full node`):** 需要至少2TB的SSD
- **快速同步节点(`snap-synced full node`):** 需要至少650GB的硬盘空间, 由于默认的缓存, 空间占用每周以14GB的速度增长, 但可以清除掉, 清除之后会还原到650GB的硬盘空间
- **归档节点(`archive full node`):** 需要至少12TB的空间, 可以追溯状态到祖先区块
- **部分归档节点(`partial archive node`):** 在最开始同步时关闭垃圾回收即可变成 `partial archive node`, 需要的存储空间取决于存储了多少状态

由于节点需要快速的读写能力, 所以硬盘最好是SSD, HDD可能会造成同步缓慢的问题

带宽最好由25Mbps的下行能力, 由于数据吞吐量大, 最好选择没有数据传输上限的ISP

[execution client](https://geth.ethereum.org/), [consensus client](https://chainsafe.github.io/lodestar/)

五种不同的共识客户端
- **Lighthouse:** written in Rust
- **Nimbus:** written in Nim
- **Prysm:** written in Go
- **Teku:** written in Java
- **Lodestar:** written in Typescript

beacon node, validators, bootnode

# transaction

交易的对象: account -> account(交易ether), account -> smart contract(调用智能合约), account -> null(部署智能合约)

智能合约data field: ABI

每次交易时`supplyGasFee = gasLimit * (maxFee + maxPriorityFee)`

gasLimit指限制最大使用的gas数量, 与这笔交易的处理时间相关

maxFee指每单元gas的最大费用, 与当前网络的拥堵程度相关, 最终这笔费用会被burn掉

maxPriorityFee指每单元gas的优先费用, 当前网络这笔交易处理优先级相关, 最终这笔费用会被给到validator

交易完成时`refundGasFee = supplyGasFee - usedGasFee`