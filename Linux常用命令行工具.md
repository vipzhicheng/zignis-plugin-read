> top命令能够实时显示系统中各个进程的资源占用状况,类似于Windows的任务管理器.

    [root@icloud-store ~]# top -h
      procps-ng version 3.3.10
    Usage:
      top -hv | -bcHiOSs -d secs -n max -u|U user -p pid(s) -o field -w [cols]
    

查看当前系统各个进程的资源占用状况.

    [root@icloud-store ~]# top 
    
    top - 09:30:03 up 4 days,  2:39,  2 users,  load average: 0.00, 0.01, 0.05
    Tasks:  82 total,   1 running,  81 sleeping,   0 stopped,   0 zombie
    %Cpu(s):  0.7 us,  0.4 sy,  0.0 ni, 98.9 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
    KiB Mem :  1866900 total,    87844 free,  1458564 used,   320492 buff/cache
    KiB Swap:  2096444 total,   741980 free,  1354464 used.   150432 avail Mem 
    
       PID USER      PR  NI    VIRT    RES    SHR S %CPU %MEM     TIME+ COMMAND                                                 
         1 root      20   0   43240   2568   1568 S  0.0  0.1   0:04.88 systemd                                                 
         2 root      20   0       0      0      0 S  0.0  0.0   0:00.00 kthreadd                                                
         3 root      20   0       0      0      0 S  0.0  0.0   0:02.35 ksoftirqd/0                                             
         6 root      20   0       0      0      0 S  0.0  0.0   0:02.07 kworker/u256:0                                          
         7 root      rt   0       0      0      0 S  0.0  0.0   0:00.00 migration/0                                             
         8 root      20   0       0      0      0 S  0.0  0.0   0:00.00 rcu_bh                                                  
         9 root      20   0       0      0      0 S  0.0  0.0   0:12.25 rcu_sched                                               
        10 root      rt   0       0      0      0 S  0.0  0.0   0:01.52 watchdog/0                                              
        12 root      20   0       0      0      0 S  0.0  0.0   0:00.00 kdevtmpfs                                               
        13 root       0 -20       0      0      0 S  0.0  0.0   0:00.00 netns                                                   
        14 root      20   0       0      0      0 S  0.0  0.0   0:00.07 khungtaskd                                              
        15 root       0 -20       0      0      0 S  0.0  0.0   0:00.00 writeback                                               
        16 root       0 -20       0      0      0 S  0.0  0.0   0:00.00 kintegrityd                                             
        17 root       0 -20       0      0      0 S  0.0  0.0   0:00.00 bioset                                                  
        18 root       0 -20       0      0      0 S  0.0  0.0   0:00.00 kblockd                                                 
        19 root       0 -20       0      0      0 S  0.0  0.0   0:00.00 md                                                      
        25 root      20   0       0      0      0 S  0.0  0.0   0:02.89 kswapd0                                                 
        26 root      25   5       0      0      0 S  0.0  0.0   0:00.00 ksmd                                                    
        27 root      39  19       0      0      0 S  0.0  0.0   0:01.04 khugepaged                                              
        28 root      20   0       0      0      0 S  0.0  0.0   0:00.00 fsnotify_mark                                           
        29 root       0 -20       0      0      0 S  0.0  0.0   0:00.00 crypto                                                  
        37 root       0 -20       0      0      0 S  0.0  0.0   0:00.00 kthrotld                                                
        38 root      20   0       0      0      0 S  0.0  0.0   0:01.67 kworker/u256:1                                          
        39 root       0 -20       0      0      0 S  0.0  0.0   0:00.00 kmpath_rdacd                                            
        40 root       0 -20       0      0      0 S  0.0  0.0   0:00.00 kpsmoused                                               
        41 root       0 -20       0      0      0 S  0.0  0.0   0:00.00 ipv6_addrconf                                           
        60 root       0 -20       0      0      0 S  0.0  0.0   0:00.00 deferwq                                                 
        92 root      20   0       0      0      0 S  0.0  0.0   0:01.48 kauditd                                                 
       223 root       0 -20       0      0      0 S  0.0  0.0   0:00.00 ata_sff                                                 
       235 root      20   0       0      0      0 S  0.0  0.0   0:00.00 scsi_eh_0 
    

**结果分析**

统计信息区前五行是系统整体的统计信息.

    [root@icloud-store ~]# uptime
     09:32:00 up 4 days,  2:41,  2 users,  load average: 0.00, 0.01, 0.05
    

linux系统中的Load对当前CPU工作量的度量,简单的说是进程队列的长度;Load Average的值就是一段时间(1分钟、5分钟、15分钟)内平均Load.

> 假设我们的系统是单CPU单内核的,把它比喻成是一条单向马路,把CPU任务比作汽车.当车不多的时候,load <1；当车占满整个马路的时候 load=1；当马路都站满了,而且马路外还堆满了汽车的时候 load>1.

我们经常会发现服务器Load > 1但是运行仍然不错,那是因为服务器是多核处理器(Multi-core),假设我们服务器CPU是2核,那么将意味我们拥有2条马路,我们的Load = 2时,所有马路都跑满车辆.

*   0.7 < load < 1: 此时是不错的状态,如果进来更多的汽车,你的马路仍然可以应付.
*   load = 1: 你的马路即将拥堵,而且没有更多的资源额外的任务,赶紧看看发生了什么吧.
*   load > 5: 非常严重拥堵,我们的马路非常繁忙,每辆车都无法很快的运行

    Tasks:  82 total,   1 running,  81 sleeping,   0 stopped,   0 zombie
    

*   total : 进程总数
*   running : 正在运行的进程数
*   sleeping : 睡眠的进程数
*   stopped : 停止的进程数
*   zombie : 僵尸进程数

    %Cpu(s):  0.7 us,  0.4 sy,  0.0 ni, 98.9 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
    

*   us:用户空间占用CPU百分比
*   sy:内核空间占用CPU百分比
*   ni:用户进程空间内改变过优先级的进程占用CPU百分比
*   id :空闲CPU百分比
*   wa : 等待输入输出的CPU时间百分比
*   hi：硬中断（Hardware IRQ）占用CPU的百分比
*   si：软中断（Software Interrupts）占用CPU的百分比
*   st：虚拟机占用百分比

    KiB Mem :  1866900 total,    87844 free,  1458564 used,   320492 buff/cache
    

*   total: 物理内存总量
*   free: 空闲内存总量
*   used: 已使用的物理内存总量
*   buff/cache: 用作缓存的内存量

    KiB Swap:  2096444 total,   741980 free,  1354464 used.   150432 avail Mem 
    

*   total: 交换区总量
*   free: 空闲交换区总量
*   used: 已使用的交换区总量
*   avail Mem: 可用内存

    PID USER      PR  NI    VIRT    RES    SHR S %CPU %MEM     TIME+ COMMAND                                                 
    1 root      20   0   43240   2568   1568 S  0.0  0.1   0:04.88 systemd                                                 
    2 root      20   0       0      0      0 S  0.0  0.0   0:00.00 kthreadd   
    

*   PID: 进程编号
*   USER: 所属用户
*   PR: 优先级
*   NI: nice值,负值表示高优先级,正值表示低优先级
*   VIRT: 进程使用的虚拟内存总量,单位kb.VIRT=SWAP+RES
*   RES: 进程使用的、未被换出的物理内存大小,单位kb.RES=CODE+DATA
*   SHR: 共享内存大小,单位kb
*   S: 进程状态(D=不可中断的睡眠状态,R=运行,S=睡眠,T=跟踪/停止,Z=僵尸进程)
*   %CPU:上次更新到现在的CPU时间占用百分比
*   %MEM: 进程使用的物理内存百分比
*   TIME+: 进程使用的CPU时间总计,单位1/100秒
*   COMMAND: 命令名/命令行

查看某个进程下的线程的统计信息

    [root@icloud-store ~]# top -Hp 21109
    
    top - 11:08:00 up 4 days,  4:17,  1 user,  load average: 0.00, 0.01, 0.05
    Threads:  32 total,   0 running,  32 sleeping,   0 stopped,   0 zombie
    %Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
    KiB Mem :  1866900 total,    96376 free,  1452020 used,   318504 buff/cache
    KiB Swap:  2096444 total,   741980 free,  1354464 used.   153668 avail Mem 
    
       PID USER      PR  NI    VIRT    RES    SHR S %CPU %MEM     TIME+ COMMAND                                                 
     21109 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:00.00 java                                                    
     21137 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:04.71 java                                                    
     21138 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:00.00 GC Thread#0                                             
     21139 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:05.67 CMS Main Thread                                         
     21140 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:09.73 VM Thread                                               
     21141 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:00.00 Reference Handl                                         
     21142 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:00.00 Finalizer                                               
     21143 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:00.00 Signal Dispatch                                         
     21144 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:12.27 C2 CompilerThre                                         
     21145 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:02.97 C1 CompilerThre                                         
     21146 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:00.04 Sweeper thread                                          
     21147 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:00.22 Common-Cleaner                                          
     21148 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:00.00 Service Thread                                          
     21149 elon      20   0 4471136 0.986g      0 S  0.0 55.4   3:15.52 VM Periodic Tas                                         
     21152 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:50.20 elasticsearch[q                                                                                  
     21171 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:06.02 elasticsearch[q                                         
     21172 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:10.63 threadDeathWatc                                         
     21173 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:00.28 elasticsearch[q                                         
     21174 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:00.25 elasticsearch[q                                         
     21182 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:02.21 elasticsearch[q                                         
     21183 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:06.95 elasticsearch[q                                         
     21184 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:00.00 elasticsearch[k                                         
     21650 elon      20   0 4471136 0.986g      0 S  0.0 55.4   0:05.45 elasticsearch[q                                         
    

在top命令执行后,可以使用下面这些些交互命令进行top的内监控查看或者设置.

*   h或者?: 显示帮助画面,给出一些简短的命令总结说明.
*   k: 终止一个进程;系统将提示用户输入需要终止的进程PID,以及需要发送给该进程什么样的信号.一般的终止进程可以使用15信号；如果不能正常结束那就使用信号9强制结束该进程.默认值是信号15.在安全模式中此命令被屏蔽.
*   i: 忽略闲置和僵死进程.这是一个开关式命令.
*   q: 退出程序.
*   r: 重新安排一个进程的优先级别.系统提示用户输入需要改变的进程PID以及需要设置的进程优先级值.输入一个正值将使优先级降低,反之则可以使该进程拥有更高的优先权.默认值是10.
*   S: 切换到累计模式.
*   s: 改变两次刷新之间的延迟时间.系统将提示用户输入新的时间,单位为s.如果有小数,就换算成m s.输入0值则系统将不断刷新,默认值是5 s.需要注意的是如果设置太小的时间,很可能会引起不断刷新,从而根本来不及看清显示的情况,而且系统负载也会大大增加.
*   f或者F: 从当前显示中添加或者删除项目.
*   o或者O: 改变显示项目的顺序.
*   l: 切换显示平均负载和启动时间信息.
*   m: 切换显示内存信息.
*   t: 切换显示进程和CPU状态信息.
*   c: 切换显示命令名称和完整命令行.
*   M: 根据驻留内存大小进行排序.
*   P: 根据CPU使用百分比大小进行排序.
*   T: 根据时间/累计时间进行排序.
*   W: 将当前设置写入~/.toprc文件中.这是写top配置文件的推荐方法.

查看占用内存最多的K个进程

> top命令(然后按下M,注意大写) 或 `ps -aux | sort -k4nr | head -K`, 如果是10个进程K=10

查看占用CPU最多的K个进程

> top命令(然后按下P,注意大写) 或 `ps -aux | sort -k3nr | head -K`

**参数解读**

*   ps -aux中(a指代all—所有的进程,u指代userid,既执行该进程的用户id,x指代显示所有程序,不以终端机来区分).
*   sort -k4nr中(k代表从第几个位置开始,后面的数字4即是其开始位置,结束位置如果没有,则默认到最后;n指代numberic sort,根据其数值排序;r指代reverse这里是指反向比较结果,输出时默认从小到大,反向后从大到小);本例中可以看到%MEM在第4个位置,根据%MEM的数值进行由大到小的排序.
*   head -K(K指代行数,即输出前几位的结果)

> 与Linux传统的top相比,htop更加人性化.它可让用户交互式操作,支持颜色主题,可横向或纵向滚动浏览进程列表,并支持鼠标操作.

    [root@icloud-store ~]# htop
    
      CPU[                                                0.0%]   Tasks: 31, 83 thr; 1 running
      Mem[|||||||||||||||||||||||||||||||||||||||||1.50G/1.78G]   Load average: 0.00 0.01 0.05 
      Swp[||||||||||||||||||||||||||||||||||       1.29G/2.00G]   Uptime: 4 days, 04:00:37
    
       PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command
    120391 root       20   0  119M  2332  1460 R  0.7  0.1  0:00.04 htop
       342 root   20   0 45492  8656  8432 S  0.0  0.5  0:58.31 /usr/lib/systemd/systemd-journald
     21109 elon      20   0 4366M 1009M     0 S  0.0 55.4  6:54.92 /usr/local/jdk-9.0.1/bin/java -Xms2g -Xmx2g -XX:+UseConcMarkS
     21155 elon       20   0 4366M 1009M     0 S  0.0 55.4  0:06.63 /usr/local/jdk-9.0.1/bin/java -Xms2g -Xmx2g -XX:+UseConcMarkS
     21149 elon       20   0 4366M 1009M     0 S  0.0 55.4  3:14.67 /usr/local/jdk-9.0.1/bin/java -Xms2g -Xmx2g -XX:+UseConcMarkS
       668 root   20   0  487M 14824  7712 S  0.0  0.8  4:46.85 /usr/bin/python2 -s /usr/bin/fail2ban-server -s /var/run/fail
         1 root       20   0 43240  2568  1568 S  0.0  0.1  0:04.92 /usr/lib/systemd/systemd --switched-root --system --deseriali
       360 root   20   0 43860   468   300 S  0.0  0.0  0:00.06 /usr/lib/systemd/systemd-udevd
       465 root   16  -4 55416   412   304 S  0.0  0.0  0:00.36 /sbin/auditd -n
       453 root   16  -4 55416   412   304 S  0.0  0.0  0:08.89 /sbin/auditd -n
       483 dbus       20   0 24404   684   420 S  0.0  0.0  0:01.58 /bin/dbus-daemon --system --address=systemd: --nofork --nopid
       645 root   20   0  540M   580   212 S  0.0  0.0  0:00.00 /usr/bin/python -Es /usr/sbin/tuned -l -P
       647 root   20   0  540M   580   212 S  0.0  0.0  0:00.00 /usr/bin/python -Es /usr/sbin/tuned -l -P
       512 ntp        20   0 44648   716   556 S  0.0  0.0  0:00.39 /usr/sbin/ntpd -u ntp:ntp -g
       524 root   20   0 25844     0     0 S  0.0  0.0  0:00.00 /usr/sbin/atd -f
    F1Help  F2Setup F3SearchF4FilterF5Tree  F6SortByF7Nice -F8Nice +F9Kill  F10Quit
    

> 这个使用ASCII码显示方式的命令行工具是一个显示所有进程活动的性能监控工具.它可以展示每日的系统日志以进行长期的进程活动分析,并高亮显示过载的系统使用资源.它包含了CPU,内存,交换空间,磁盘和网络层的度量指标.所有这些功能只需在终端运行atop即可

    [root@icloud-store ~]# yum install atop
    ATOP - icloud-store                   2015/11/05  09:32:57                   -----------                   4d1h12m12s elapsed
    PRC | sys    6m42s | user  10m43s | #proc     84 | #trun      3 | #tslpi   164 | #tslpu     0 | #zombie    0 | #exit      0 |
    CPU | sys   0% | user      1% | irq       0% | idle     99% | wait      0% | guest     0% | curf 2.10GHz | curscal   ?% |
    CPL | avg1    0.00 | avg5    0.01 | avg15   0.05 |              | csw 65314627 | intr 29948e3 |              | numcpu     1 |
    MEM | tot     1.8G | free   73.9M | cache 229.5M | buff    0.1M | slab   49.9M | shmem  91.0M | vmbal   0.0M | hptot   0.0M |
    SWP | tot     2.0G | free  724.6M |              |              |              |              | vmcom   3.1G | vmlim   2.9G |
    PAG | scan 2498022 | steal 2034e3 | stall   1775 |              |              |              | swin  146919 | swout 1166e3 |
    DSK |          vda | busy      0% | read   56734 | write 180461 | KiB/w      6 | MBr/s   0.01 | MBw/s   0.00 | avio 0.15 ms |
    DSK |          vdb | busy      0% | read   19736 | write   9950 | KiB/w    468 | MBr/s   0.00 | MBw/s   0.01 | avio 0.23 ms |
    DSK |          vdc | busy      0% | read    8454 | write  35547 | KiB/w     10 | MBr/s   0.00 | MBw/s   0.00 | avio 0.03 ms |
    NET | transport    | tcpi  400946 | tcpo  406652 | udpi    1137 | udpo    1160 | tcpao     61 | tcppo  23099 | tcprs   9319 |
    NET | network      | ipi   537251 | ipo   420832 | ipfrw      0 | deliv 402251 |              | icmpi    134 | icmpo     16 |
    NET | eth1    ---- | pcki  619245 | pcko  421452 | si    3 Kbps | so    1 Kbps | erri       0 | erro       0 | drpo   0 |
    NET | eth0    ---- | pcki  972639 | pcko    2551 | si    1 Kbps | so    0 Kbps | erri       0 | erro       0 | drpo   0 |
    NET | lo      ---- | pcki     208 | pcko     208 | si    0 Kbps | so    0 Kbps | erri       0 | erro       0 | drpo   0 |
                                            *** system and process activity since boot ***
      PID   TID  RUID      EUID       THR  SYSCPU  USRCPU   VGROW   RGROW  RDDSK   WRDSK  ST  EXC  S  CPUNR   CPU  CMD        1/4
    21109     -  elon      elon        32   2m28s   4m11s    4.3G    1.0G   1.0G  96700K  N-    -  S      0    0%  java
      668     -  root      root         3  18.06s   4m16s  486.4M  16348K 41968K  233.0M  N-    -  S      0    0%  fail2ban-serve
    97769     -  mysql     mysql       39  48.77s  46.35s    1.1G  222.9M 122.2M  170.6M  N-    -  S      0    0%  mysqld
      342     -  root      root         1  32.04s  23.93s  45528K  11228K 13136K      0K  N-    -  S      0    0%  systemd-journa
      276     -  root      root         1  55.31s   0.00s      0K      0K  1248K      0K  N-    -  R      0    0%  xfsaild/vda1
      491     -  root      root         5   5.00s  26.01s  540.2M    580K 19116K      8K  N-    -  S      0    0%  tuned
      501     -  root      root         3   6.34s  18.01s  311.6M   9044K  6836K  69256K  N-    -  S      0    0%  rsyslogd
    127329     -  root  root         1  23.99s   0.00s      0K      0K     0K      0K  N-    -  S      0    0%  kworker/0:1
      510     -  root      root         1   6.55s  12.06s  166.3M   1240K 166.2M     64K  N-    -  S      0    0%  qemu-ga
    

> iftop也是类似于top的实时流量监控工具,可以用来监控网卡的实时流量（可以指定网段）、反向解析IP、显示端口信息等.

    [root@localhost ~]# yum install flex byacc libpcap ncurses ncurses-devel libpcap-devel
    [root@localhost ~]# wget http://www.ex-parrot.com/pdw/iftop/download/iftop-0.17.tar.gz
    [root@localhost ~]# tar -zxvf iftop-0.17.tar.gz
    [root@localhost ~]# cd iftop-0.17
    [root@localhost iftop-0.17]# ./configure
    [root@localhost iftop-0.17]# make && make install
    [root@icloud-store iftop-0.17]# iftop -help
    iftop: display bandwidth usage on an interface by host
    
    Synopsis: iftop -h | [-npbBP] [-i interface] [-f filter code] [-N net/mask]
    
       -h                  display this message
       -n                  don't do hostname lookups
       -N                  don't convert port numbers to services
       -p                  run in promiscuous mode (show traffic between other
                           hosts on the same network segment)
       -b                  don't display a bar graph of traffic
       -B                  Display bandwidth in bytes
       -i interface        listen on named interface
       -f filter code      use filter code to select packets to count
                           (default: none, but only IP packets are counted)
       -F net/mask         show traffic flows in/out of network
       -P                  show ports as well as hosts
       -m limit            sets the upper limit for the bandwidth scale
       -c config file      specifies an alternative configuration file
    
    iftop, version 0.17
    copyright (c) 2002 Paul Warren <pdw@ex-parrot.com> and contributors
    

> iostat主要用于监控系统设备的IO负载情况,iostat首次运行时显示自系统启动开始的各项统计信息,之后运行iostat将显示自上次运行该命令以后的统计信息.用户可以通过指定统计的次数和时间来获得所需的统计信息.

    [root@icloud-store ~]# iostat --help
    用法: iostat [ 选项 ] [ <时间间隔> [ <次数> ] ]
    选项:
    [ -c ] [ -d ] [ -h ] [ -k | -m ] [ -N ] [ -t ] [ -V ] [ -x ] [ -y ] [ -z ]
    [ -j { ID | LABEL | PATH | UUID | ... } ]
    [ [ -T ] -g <用户组名> ] [ -p [ <设备> [,...] | ALL ] ]
    [ <设备> [...] | ALL ]
    

每隔2秒显示一次设备(磁盘)使用状态,-k标识使用kb为单位

    [root@icloud-store ~]# iostat -d -k 2
    Linux 3.10.0-514.21.1.el7.x86_64 (icloud-store)     2017年11月05日     _x86_64_    (1 CPU)
    
    Device:            tps    kB_read/s    kB_wrtn/s    kB_read    kB_wrtn
    vda               0.70        11.55         3.53    4167729    1275898
    vdb               0.08         1.64        12.92     590641    4662340
    vdc               0.13         0.51         1.10     184877     395668
    
    Device:            tps    kB_read/s    kB_wrtn/s    kB_read    kB_wrtn
    vda               0.00         0.00         0.00          0          0
    vdb               0.00         0.00         0.00          0          0
    vdc               0.00         0.00         0.00          0          0
    

*   Device: 检测设备名称
*   tps：该设备每秒的传输次数("一次传输"意思是"一次I/O请求"),多个逻辑请求可能会被合并为"一次I/O请求","一次传输"请求的大小是未知的.
*   kB\_read/s：每秒从设备（drive expressed）读取的数据量；
*   kB\_wrtn/s：每秒向设备（drive expressed）写入的数据量；
*   kB\_read：读取的总数据量；
*   kB\_wrtn：写入的总数量数据量；

    [root@icloud-store ~]# iostat 
    Linux 3.10.0-514.21.1.el7.x86_64 (icloud-store)     2017年11月05日     _x86_64_    (1 CPU)
    
    avg-cpu:  %user   %nice %system %iowait  %steal   %idle
               0.70    0.00    0.41    0.00    0.00   98.88
    
    Device:            tps    kB_read/s    kB_wrtn/s    kB_read    kB_wrtn
    vda               0.70        11.55         3.53    4167729    1275817
    vdb               0.08         1.64        12.92     590641    4662340
    vdc               0.13         0.51         1.10     184877     395648
    

只查看cpu状态

    [root@icloud-store ~]# iostat -c 1 2
    Linux 3.10.0-514.21.1.el7.x86_64 (icloud-store)     2017年11月05日     _x86_64_    (1 CPU)
    
    avg-cpu:  %user   %nice %system %iowait  %steal   %idle
               0.70    0.00    0.41    0.00    0.00   98.88
    
    avg-cpu:  %user   %nice %system %iowait  %steal   %idle
               0.00    0.00    0.00    0.00    0.00  100.00
    

*   %user：CPU处在用户模式下的时间百分比.
*   %nice：CPU处在带NICE值的用户模式下的时间百分比.
*   %system：CPU处在系统模式下的时间百分比.
*   %iowait：CPU等待输入输出完成时间的百分比.
*   %steal：管理程序维护另一个虚拟处理器时,虚拟CPU的无意识等待时间百分比.
*   %idle：CPU空闲时间百分比.

iostat还有一个比较常用的选项-x,该选项将用于显示和io相关的扩展数据.

    [root@icloud-store ~]# iostat -d -k -x 1 10
    Linux 3.10.0-514.21.1.el7.x86_64 (icloud-store)     2017年11月05日     _x86_64_    (1 CPU)
    
    Device:         rrqm/s   wrqm/s     r/s     w/s    rkB/s    wkB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
    vda               0.00     0.02    0.18    0.52    11.54     3.53    43.28     0.00    1.02    0.99    1.03   0.15   0.01
    vdb               0.35     3.20    0.05    0.03     1.64    12.91   353.64     0.00    1.91    0.20    5.31   0.23   0.00
    vdc               0.00     0.10    0.02    0.10     0.51     1.10    25.71     0.00    0.09    0.35    0.04   0.03   0.00
    
    Device:         rrqm/s   wrqm/s     r/s     w/s    rkB/s    wkB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
    vda               0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
    vdb               0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
    vdc               0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
    
    Device:         rrqm/s   wrqm/s     r/s     w/s    rkB/s    wkB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
    vda               0.00     1.01    0.00    4.04     0.00    24.24    12.00     0.00    1.00    0.00    1.00   0.25   0.10
    vdb               0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
    vdc               0.00     1.01    0.00    4.04     0.00    20.20    10.00     0.00    0.00    0.00    0.00   0.00   0.00
    

*   rrqm/s: 每秒进行merge的读操作数目.即 rmerge/s
*   wrqm/s: 每秒进行merge的写操作数目.即 wmerge/s
*   r/s: 每秒完成的读 I/O 设备次数.即 rio/s
*   w/s: 每秒完成的写 I/O 设备次数.即 wio/s
*   rsec/s: 每秒读扇区数.即 rsect/s
*   wsec/s: 每秒写扇区数.即 wsect/s
*   rkB/s: 每秒读K字节数.是 rsect/s 的一半,因为每扇区大小为512字节.
*   wkB/s: 每秒写K字节数.是 wsect/s 的一半.
*   avgrq-sz: 平均每次设备I/O操作的数据大小(扇区)
*   avgqu-sz: 平均I/O队列长度.
*   await: 平均每次设备I/O操作的等待时间(毫秒),一般地系统IO响应时间应该低于5ms,如果大于10ms就比较大了.
*   svctm: 平均每次设备I/O操作的服务时间(毫秒).
*   %util: 一秒中有百分之多少的时间用于 I/O 操作,即被io消耗的cpu百分比,参数暗示了设备的繁忙程度,一般地,如果该参数是100%表示设备已经接近满负荷运行了(当然如果是多磁盘,即使%util是100%,因为磁盘的并发能力,所以磁盘使用未必就到了瓶颈).

备注: 如果 %util 接近 100%,说明产生的I/O请求太多,I/O系统已经满负荷,该磁盘可能存在瓶颈.如果 svctm 比较接近 await,说明 I/O 几乎没有等待时间；如果 await 远大于 svctm,说明I/O 队列太长,io响应太慢,则需要进行必要优化.如果avgqu-sz比较大,也表示有当量io在等待.

> iotop 是专门用来显示硬盘 IO 的命令,对每个进程进行单独的跟踪和分析.

    [root@icloud-store ~]# iotop --help
    Usage: /usr/sbin/iotop [OPTIONS]
    
    DISK READ and DISK WRITE are the block I/O bandwidth used during the sampling
    period. SWAPIN and IO are the percentages of time the thread spent respectively
    while swapping in and waiting on I/O more generally. PRIO is the I/O priority at
    which the thread is running (set using the ionice command).
    
    Controls: left and right arrows to change the sorting column, r to invert the
    sorting order, o to toggle the --only option, p to toggle the --processes
    option, a to toggle the --accumulated option, i to change I/O priority, q to
    quit, any other key to force a refresh.
    
    Options:
      --version             show program's version number and exit
      -h, --help            show this help message and exit
      -o, --only            only show processes or threads actually doing I/O
      -b, --batch           non-interactive mode
      -n NUM, --iter=NUM    number of iterations before ending [infinite]
      -d SEC, --delay=SEC   delay between iterations [1 second]
      -p PID, --pid=PID     processes/threads to monitor [all]
      -u USER, --user=USER  users to monitor [all]
      -P, --processes       only show processes, not all threads
      -a, --accumulated     show accumulated I/O instead of bandwidth
      -k, --kilobytes       use kilobytes instead of a human friendly unit
      -t, --time            add a timestamp on each line (implies --batch)
      -q, --quiet           suppress some lines of header (implies --batch)
    

**参数说明**

*   \-o：只显示有io操作的进程
*   \-b：批量显示,无交互,主要用作记录到文件.
*   \-n NUM：显示NUM次,主要用于非交互式模式.
*   \-d SEC：间隔SEC秒显示一次.
*   \-p PID：监控的进程pid.
*   \-u USER：监控的进程用户.
*   \-P, --processes: 仅显示进程,默认iotop显示所有线程
*   \-a, --accumulated: 显示累积的I/O,而不是带宽
*   \-k, --kilobytes: 使用kB单位,而不是对人友好的单位.在非交互模式下,脚本编程有用.
*   \-t, --time: 加上时间戳,非交互非模式.
*   \-q, --quiet: 禁止头几行,非交互模式; 有三种指定方式(-q:只在第一次监测时显示列名、-qq:永远不显示列名、-qqq:永远不显示I/O汇总)

    [root@icloud-store ~]# yum install  iotop
    [root@icloud-store ~]# iotop
    Total DISK READ: 0.00 B/s | Total DISK WRITE: 0.00 B/s
      TID  PRIO  USER     DISK READ  DISK WRITE  SWAPIN     IO>    COMMAND                                                       
    26186 be/4 elon     0.00 B/s    3.90 K/s  0.00 %  0.00 % ./bin/log_agent_file --log_conf=~-conf=./conf/log_agent_file.conf
        1 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % init
        2 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [kthreadd]
        3 rt/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [migration/0]
        4 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [ksoftirqd/0]
        5 rt/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [migration/0]
        6 rt/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [watchdog/0]
        7 rt/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [migration/1]
        8 rt/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [migration/1]
        9 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [ksoftirqd/1]
       10 rt/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [watchdog/1]
       11 rt/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [migration/2]
       12 rt/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [migration/2]
       13 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [ksoftirqd/2]
       14 rt/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [watchdog/2]
       15 rt/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [migration/3]
       16 rt/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [migration/3]
       17 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [ksoftirqd/3]
       18 rt/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [watchdog/3]
       19 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [events/0]
       20 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [events/1]
       21 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [events/2]
       22 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [events/3]
       23 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [cgroup]
       24 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [khelper]
       25 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [netns]
    

通过输出结果,我们可以清楚地知晓是什么程序在读写磁盘,速度以及命令行,pid 等信息.

*   左右箭头：改变排序方式,默认是按IO排序.
*   r：改变排序顺序.
*   o：只显示有IO输出的进程.
*   p：进程/线程的显示方式的切换.
*   a：显示累积使用量.
*   q：退出.

> uptime命令主要用于获取主机运行时间和查询linux系统负载等信息

    [root@icloud-store ~]# uptime -h
    
    Usage:
     uptime [options]
    
    Options:
     -p, --pretty   show uptime in pretty format
     -h, --help     display this help and exit
     -s, --since    system up since
     -V, --version  output version information and exit
    
    For more details see uptime(1).
    

    [root@icloud-store ~]# uptime
     10:27:00 up 4 days,  3:36,  2 users,  load average: 0.00, 0.02, 0.05
    

> 显示依次为: `现在时间`、`系统累计运行时长`、`当前登陆用户数`、`系统在过去的1分钟、5分钟和15分钟内的平均负载`

> 通常我们先看15分钟load,如果load很高,再看1分钟和5分钟负载,查看是否有下降趋势; 1分钟负载值>1,不用担心,但是如果15分钟负载都超过1,我们要赶紧看看发生了什么事情;所以我们要根据实际情况查看这三个值.

查看cpu信息

    [root@icloud-store ~]# cat /proc/cpuinfo
    processor   : 0
    vendor_id   : GenuineIntel
    cpu family  : 6
    model       : 6
    model name  : QEMU Virtual CPU version 2.5+
    stepping    : 3
    microcode   : 0x1
    cpu MHz     : 2099.996
    cache size  : 4096 KB
    physical id : 0
    siblings    : 1
    core id     : 0
    cpu cores   : 1
    apicid      : 0
    initial apicid  : 0
    fpu     : yes
    fpu_exception   : yes
    cpuid level : 13
    wp      : yes
    flags       : fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pse36 clflush mmx fxsr sse sse2 ss syscall nx lm rep_good nopl pni pclmulqdq ssse3 cx16 sse4_1 sse4_2 aes xsave avx hypervisor lahf_lm avx2
    bogomips    : 4199.99
    clflush size    : 64
    cache_alignment : 64
    address sizes   : 40 bits physical, 48 bits virtual
    power management:
    
    

查看cpu核数

    [root@icloud-store ~]# grep 'model name' /proc/cpuinfo | wc -l
    1
    

`w`和`top`命令也能看查看平均负载

    [root@icloud-store ~]# w
     10:34:06 up 4 days,  3:43,  2 users,  load average: 0.00, 0.01, 0.05
    USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
    root     pts/2    123.116.48.212   07:42    2:05m  0.08s  0.08s -bash
    root     pts/3    123.116.48.212   09:02    6.00s  0.02s  0.00s w
    

> vmstat命令是最常见的Linux/Unix监控工具,可以展现给定时间间隔的服务器的状态值,包括服务器的CPU使用率,内存使用,虚拟内存交换情况,IO读写情况

    [root@icloud-store ~]# vmstat -h
    
    Usage:
     vmstat [options] [delay [count]]
    
    Options:
     -a, --active           active/inactive memory
     -f, --forks            number of forks since boot
     -m, --slabs            slabinfo
     -n, --one-header       do not redisplay header
     -s, --stats            event counter statistics
     -d, --disk             disk statistics
     -D, --disk-sum         summarize disk statistics
     -p, --partition <dev>  partition specific statistics
     -S, --unit <char>      define display unit
     -w, --wide             wide output
     -t, --timestamp        show timestamp
    
     -h, --help     display this help and exit
     -V, --version  output version information and exit
    
    For more details see vmstat(8).
    

*   \-a: 显示活动内页；
*   \-f: 显示启动后创建的进程总数；
*   \-m: 显示slab信息；
*   \-n: 头信息仅显示一次；
*   \-s: 以表格方式显示事件计数器和内存状态；
*   \-d: 报告磁盘状态；
*   \-p: 显示指定的硬盘分区状态；
*   \-S: 输出信息的单位
*   \-w: 宽输出(格式化展示)
*   \-t: 输出时间戳

使用vmstat每隔1秒报告一次服务器状态信息

    [root@icloud-store ~]# vmstat 1 -w
    procs -----------------------memory---------------------- ---swap-- -----io---- -system-- --------cpu--------
     r  b         swpd         free         buff        cache   si   so    bi    bo   in   cs  us  sy  id  wa  st
     2  0      1327884        73468         1460       248212    2   13    12    18   85   62   1   0  99   0   0
     0  0      1327884        75120         1460       248256    0    0     0    84   99  209   1   0  99   0   0
    

**重要参数:**

procs(进程)

*   procs.r : CPU调度运行队列的长度(运行队列中轻量级进程的实际数量).
*   procs.b : 在等待io的进程数(表示阻塞的进程)

memory(内存)

*   memory.swpd : 已使用的虚拟内存大小;如果大于0表示你的机器物理内存不足了,如果不是程序内存泄露的原因,那么你该升级内存了或者把耗内存的任务迁移到其他机器.
*   memory.free : 空闲的物理内存打下
*   memory.buff : 用作缓冲区的内存数
*   memory.cache : 用作高速缓存的内存数(cache用来记忆我们打开的文件,给文件做缓冲),如果cache的值大的时候,说明cache处的文件数多,如果频繁访问到的文件都能被cache处,那么磁盘的读IO bi会非常小.

swap(交换区)

*   swap.si : 每秒从交换区写到内存的大小(由磁盘调入内存)
*   swap.so : 每秒写入交换区的内存大小(由内存调入磁盘)

内存够用的时候,这2个值都是0,如果这2个值长期大于0时,系统性能会受到影响,磁盘IO和CPU资源都会被消耗.有些朋友看到空闲内存（free）很少的或接近于0时,就认为内存不够用了,不能光看这一点,还要结合si和so,如果free很少,但是si和so也很少（大多时候是0）,那么不用担心,系统性能这时不会受到影响的.

io

*   io.bi : 每秒读取的块数(块/秒)
*   io.bo : 每秒写入的块数(块/秒)

system

*   system.in : 每秒的中断数,包括时钟中断
*   system.cs : 每秒的cpu交换(上下文切换)的次数(进程切换的过程被称作上下文切换)

cpu

*   cpu.us : 用户进程CPU使用率(%)
*   cpu.sy : 系统进程CPU使用率(%)
*   cpu.id : 空闲率或者CPU可用率(%)
*   cpu.wa : 等待IO所消耗的CPU的时间(%)
*   cpu.st : 从虚拟设备中获得的时间(%)

> scp(secure copy)用来进行远程拷贝文件的命令;有时我们需要获得远程服务器上的某个文件,该服务器既没有配置ftp服务器,也没有做共享,无法通过常规途径获得文件时,只需要通过简单的scp命令便可达到目的.

从本地机器上传文件(夹)到服务器

    [root@localhost ~]# scp -r /path/on/local user@ip:/path/on/server
    

从远程服务器下载文件(夹)到本机

    [root@localhost ~]# scp -r user@ip:/path/on/server /path/on/local
    

**说明**

*   r标识文件夹传递是可以进行文件夹遍历
*   使用scp要注意所使用的用户是否具有可读取远程服务器相应文件的权限.
*   如果远程服务器防火墙有特殊限制,scp便要走特殊端口,具体用什么端口视情况而定,命令格式如下：

    [root@localhost ~]# scp -p 4588 user@ip:/path/on/server /path/on/local
    

> crontab命令的功能是在一定的时间间隔调度一些命令的执行.在/etc目录下有一个crontab文件,这里存放有系统运行的一些调度程序.每个用户可以建立自己的调度crontab.

    [root@localhost ~]$ cat /etc/crontab
    SHELL=/bin/bash
    PATH=/sbin:/bin:/usr/sbin:/usr/bin
    MAILTO=root
    HOME=/
    
    # For details see man 4 crontabs
    
    # Example of job definition:
    # .---------------- minute (0 - 59)
    # |  .------------- hour (0 - 23)
    # |  |  .---------- day of month (1 - 31)
    # |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
    # |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
    # |  |  |  |  |
    # *  *  *  *  * user-name command to be executed
    

可以看出,前面分别是分钟,小时,天,月和周,最后是shell命令.cron调度的最小频率为1分钟

意义

分钟

小时

天

月份

周

命令

范围

0-59

0-23

1-31

1-12

0-7

shell命令

**说明:**

*   "周"这一栏中0和7都代表周日
*   每个月的最后一日无法由crontab直接支持,需要通过脚本判断
*   命令最好是绝对路径

还有一些辅助的符号,可以借助他们写出更灵活的调度

特殊字符

代表意义

示例

\*

代表任何时候都接受

\* \* \* \* \* command

,

并列时间

\* 3,6,9,12 \* \* \* command

\-

连续区间

\* 9-17 \* \* \* command

/N

N表示每隔N个单位之间

\*/5 \* \* \* \* command

crontab主要有4个参数：

*   \-l #列出某个用户的cron服务的详细内容
*   \-u #设定某个用户的cron服务,一般是root用户使用此选项
*   \-r #删除某个用户的cron服务
*   \-e #编辑某个用户的cron服务

当前用户添加新的定时任务

    [root@localhost ~ ]$ crontab -e
    */1 * * * * echo 'test crontab' >> /opt/py/cron.txt
    

查看当前用户的系统定时任务

    [root@localhost ~ ]$ crontab -l
    */1 * * * * echo 'test crontab' >> /opt/py/cron.txt
    

删除crontab文件

    [root@localhost ~ ]$ crontab -r
    

* * *

喜欢我就关注我吧!! 微信公众号:异次猿

qrcode\_for\_gh\_1d2af15793b2\_430.jpg