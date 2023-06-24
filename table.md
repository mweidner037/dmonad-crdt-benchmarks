
> benchmarks@1.0.0 table
> node bin/render-table.js benchmarks/results.json 6000 yjs ywasm automerge-wasm collabs

N = 6000 | yjs | ywasm | automerge-wasm | collabs|
| :- |  -: | -: | -: | -:  |
|Version                                                                   |         13.5.12 |         skipped |         skipped |         skipped |
|Bundle size                                                               |    126150 bytes |         skipped |         skipped |         skipped |
|Bundle size (gzipped)                                                     |     38088 bytes |         skipped |         skipped |         skipped |
|[B1.1] Append N characters (time)                                         |          176 ms |         skipped |         skipped |          217 ms |
|[B1.1] Append N characters (avgUpdateSize)                                |        27 bytes |         skipped |         skipped |        47 bytes |
|[B1.1] Append N characters (encodeTime)                                   |            1 ms |         skipped |         skipped |            2 ms |
|[B1.1] Append N characters (docSize)                                      |      6031 bytes |         skipped |         skipped |      6164 bytes |
|[B1.1] Append N characters (memUsed)                                      |             0 B |         skipped |         skipped |             0 B |
|[B1.1] Append N characters (parseTime)                                    |           55 ms |         skipped |         skipped |           81 ms |
|[B1.2] Insert string of length N (time)                                   |            1 ms |         skipped |         skipped |            3 ms |
|[B1.2] Insert string of length N (avgUpdateSize)                          |      6031 bytes |         skipped |         skipped |      6055 bytes |
|[B1.2] Insert string of length N (encodeTime)                             |            1 ms |         skipped |         skipped |            1 ms |
|[B1.2] Insert string of length N (docSize)                                |      6031 bytes |         skipped |         skipped |      6162 bytes |
|[B1.2] Insert string of length N (memUsed)                                |         91.7 kB |         skipped |         skipped |          231 kB |
|[B1.2] Insert string of length N (parseTime)                              |           54 ms |         skipped |         skipped |           77 ms |
|[B1.3] Prepend N characters (time)                                        |          133 ms |         skipped |         skipped |        11028 ms |
|[B1.3] Prepend N characters (avgUpdateSize)                               |        27 bytes |         skipped |         skipped |        50 bytes |
|[B1.3] Prepend N characters (encodeTime)                                  |            4 ms |         skipped |         skipped |           11 ms |
|[B1.3] Prepend N characters (docSize)                                     |      6041 bytes |         skipped |         skipped |     71786 bytes |
|[B1.3] Prepend N characters (memUsed)                                     |        795.6 kB |         skipped |         skipped |             0 B |
|[B1.3] Prepend N characters (parseTime)                                   |           69 ms |         skipped |         skipped |           99 ms |
|[B1.4] Insert N characters at random positions (time)                     |          147 ms |         skipped |         skipped |          259 ms |
|[B1.4] Insert N characters at random positions (avgUpdateSize)            |        29 bytes |         skipped |         skipped |        49 bytes |
|[B1.4] Insert N characters at random positions (encodeTime)               |           13 ms |         skipped |         skipped |            4 ms |
|[B1.4] Insert N characters at random positions (docSize)                  |     29554 bytes |         skipped |         skipped |     35507 bytes |
|[B1.4] Insert N characters at random positions (memUsed)                  |        930.5 kB |         skipped |         skipped |        962.2 kB |
|[B1.4] Insert N characters at random positions (parseTime)                |           82 ms |         skipped |         skipped |          100 ms |
|[B1.5] Insert N words at random positions (time)                          |          167 ms |         skipped |         skipped |          334 ms |
|[B1.5] Insert N words at random positions (avgUpdateSize)                 |        35 bytes |         skipped |         skipped |        57 bytes |
|[B1.5] Insert N words at random positions (encodeTime)                    |           12 ms |         skipped |         skipped |            9 ms |
|[B1.5] Insert N words at random positions (docSize)                       |     87923 bytes |         skipped |         skipped |     87434 bytes |
|[B1.5] Insert N words at random positions (memUsed)                       |          2.2 MB |         skipped |         skipped |            2 MB |
|[B1.5] Insert N words at random positions (parseTime)                     |           98 ms |         skipped |         skipped |          122 ms |
|[B1.6] Insert string, then delete it (time)                               |            3 ms |         skipped |         skipped |           81 ms |
|[B1.6] Insert string, then delete it (avgUpdateSize)                      |      6053 bytes |         skipped |         skipped |    124642 bytes |
|[B1.6] Insert string, then delete it (encodeTime)                         |            0 ms |         skipped |         skipped |            2 ms |
|[B1.6] Insert string, then delete it (docSize)                            |        38 bytes |         skipped |         skipped |       124 bytes |
|[B1.6] Insert string, then delete it (memUsed)                            |             0 B |         skipped |         skipped |             0 B |
|[B1.6] Insert string, then delete it (parseTime)                          |           54 ms |         skipped |         skipped |           80 ms |
|[B1.7] Insert/Delete strings at random positions (time)                   |          191 ms |         skipped |         skipped |          487 ms |
|[B1.7] Insert/Delete strings at random positions (avgUpdateSize)          |        31 bytes |         skipped |         skipped |        94 bytes |
|[B1.7] Insert/Delete strings at random positions (encodeTime)             |           15 ms |         skipped |         skipped |            2 ms |
|[B1.7] Insert/Delete strings at random positions (docSize)                |     28377 bytes |         skipped |         skipped |     18617 bytes |
|[B1.7] Insert/Delete strings at random positions (memUsed)                |        734.6 kB |         skipped |         skipped |        522.5 kB |
|[B1.7] Insert/Delete strings at random positions (parseTime)              |           96 ms |         skipped |         skipped |           84 ms |
|[B1.8] Append N numbers (time)                                            |          164 ms |         skipped |         skipped |          178 ms |
|[B1.8] Append N numbers (avgUpdateSize)                                   |        32 bytes |         skipped |         skipped |        51 bytes |
|[B1.8] Append N numbers (encodeTime)                                      |            5 ms |         skipped |         skipped |           10 ms |
|[B1.8] Append N numbers (docSize)                                         |     35634 bytes |         skipped |         skipped |     47770 bytes |
|[B1.8] Append N numbers (memUsed)                                         |             0 B |         skipped |         skipped |             0 B |
|[B1.8] Append N numbers (parseTime)                                       |           62 ms |         skipped |         skipped |           95 ms |
|[B1.9] Insert Array of N numbers (time)                                   |            2 ms |         skipped |         skipped |           31 ms |
|[B1.9] Insert Array of N numbers (avgUpdateSize)                          |     35657 bytes |         skipped |         skipped |     47684 bytes |
|[B1.9] Insert Array of N numbers (encodeTime)                             |            1 ms |         skipped |         skipped |            9 ms |
|[B1.9] Insert Array of N numbers (docSize)                                |     35657 bytes |         skipped |         skipped |     47791 bytes |
|[B1.9] Insert Array of N numbers (memUsed)                                |             0 B |         skipped |         skipped |             0 B |
|[B1.9] Insert Array of N numbers (parseTime)                              |           54 ms |         skipped |         skipped |           95 ms |
|[B1.10] Prepend N numbers (time)                                          |          135 ms |         skipped |         skipped |         1550 ms |
|[B1.10] Prepend N numbers (avgUpdateSize)                                 |        32 bytes |         skipped |         skipped |        54 bytes |
|[B1.10] Prepend N numbers (encodeTime)                                    |            8 ms |         skipped |         skipped |           33 ms |
|[B1.10] Prepend N numbers (docSize)                                       |     35665 bytes |         skipped |         skipped |    113410 bytes |
|[B1.10] Prepend N numbers (memUsed)                                       |          1.9 MB |         skipped |         skipped |             0 B |
|[B1.10] Prepend N numbers (parseTime)                                     |           73 ms |         skipped |         skipped |          112 ms |
|[B1.11] Insert N numbers at random positions (time)                       |          152 ms |         skipped |         skipped |          201 ms |
|[B1.11] Insert N numbers at random positions (avgUpdateSize)              |        34 bytes |         skipped |         skipped |        53 bytes |
|[B1.11] Insert N numbers at random positions (encodeTime)                 |           11 ms |         skipped |         skipped |           10 ms |
|[B1.11] Insert N numbers at random positions (docSize)                    |     59137 bytes |         skipped |         skipped |     77442 bytes |
|[B1.11] Insert N numbers at random positions (memUsed)                    |          1.6 MB |         skipped |         skipped |          1.3 MB |
|[B1.11] Insert N numbers at random positions (parseTime)                  |           89 ms |         skipped |         skipped |          115 ms |
|[B2.1] Concurrently insert string of length N at index 0 (time)           |            3 ms |         skipped |         skipped |            4 ms |
|[B2.1] Concurrently insert string of length N at index 0 (updateSize)     |      6094 bytes |         skipped |         skipped |      6144 bytes |
|[B2.1] Concurrently insert string of length N at index 0 (encodeTime)     |            0 ms |         skipped |         skipped |            1 ms |
|[B2.1] Concurrently insert string of length N at index 0 (docSize)        |     12151 bytes |         skipped |         skipped |     12333 bytes |
|[B2.1] Concurrently insert string of length N at index 0 (memUsed)        |             0 B |         skipped |         skipped |             0 B |
|[B2.1] Concurrently insert string of length N at index 0 (parseTime)      |           57 ms |         skipped |         skipped |           83 ms |
|[B2.2] Concurrently insert N characters at random positions (time)        |          100 ms |         skipped |         skipped |          790 ms |
|[B2.2] Concurrently insert N characters at random positions (updateSize)  |     33444 bytes |         skipped |         skipped |    293865 bytes |
|[B2.2] Concurrently insert N characters at random positions (encodeTime)  |            4 ms |         skipped |         skipped |           20 ms |
|[B2.2] Concurrently insert N characters at random positions (docSize)     |     66860 bytes |         skipped |         skipped |     72418 bytes |
|[B2.2] Concurrently insert N characters at random positions (memUsed)     |          2.1 MB |         skipped |         skipped |          2.2 MB |
|[B2.2] Concurrently insert N characters at random positions (parseTime)   |          102 ms |         skipped |         skipped |          105 ms |
|[B2.3] Concurrently insert N words at random positions (time)             |          146 ms |         skipped |         skipped |          802 ms |
|[B2.3] Concurrently insert N words at random positions (updateSize)       |     88994 bytes |         skipped |         skipped |    340052 bytes |
|[B2.3] Concurrently insert N words at random positions (encodeTime)       |            4 ms |         skipped |         skipped |           28 ms |
|[B2.3] Concurrently insert N words at random positions (docSize)          |    178130 bytes |         skipped |         skipped |    175115 bytes |
|[B2.3] Concurrently insert N words at random positions (memUsed)          |          5.2 MB |         skipped |         skipped |          4.3 MB |
|[B2.3] Concurrently insert N words at random positions (parseTime)        |          121 ms |         skipped |         skipped |          141 ms |
|[B2.4] Concurrently insert & delete (time)                                |          318 ms |         skipped |         skipped |         1748 ms |
|[B2.4] Concurrently insert & delete (updateSize)                          |    139517 bytes |         skipped |         skipped |    906044 bytes |
|[B2.4] Concurrently insert & delete (encodeTime)                          |           32 ms |         skipped |         skipped |           47 ms |
|[B2.4] Concurrently insert & delete (docSize)                             |    279166 bytes |         skipped |         skipped |    232162 bytes |
|[B2.4] Concurrently insert & delete (memUsed)                             |          8.6 MB |         skipped |         skipped |          6.2 MB |
|[B2.4] Concurrently insert & delete (parseTime)                           |          206 ms |         skipped |         skipped |          166 ms |
|[B3.1] 20√N clients concurrently set number in Map (time)                 |           94 ms |         skipped |         skipped |           84 ms |
|[B3.1] 20√N clients concurrently set number in Map (updateSize)           |     49160 bytes |         skipped |         skipped |     70776 bytes |
|[B3.1] 20√N clients concurrently set number in Map (encodeTime)           |            7 ms |         skipped |         skipped |            8 ms |
|[B3.1] 20√N clients concurrently set number in Map (docSize)              |     32194 bytes |         skipped |         skipped |     69211 bytes |
|[B3.1] 20√N clients concurrently set number in Map (memUsed)              |        566.2 kB |         skipped |         skipped |          209 kB |
|[B3.1] 20√N clients concurrently set number in Map (parseTime)            |           96 ms |         skipped |         skipped |          118 ms |
|[B3.2] 20√N clients concurrently set Object in Map (time)                 |           97 ms |         skipped |         skipped |           86 ms |
|[B3.2] 20√N clients concurrently set Object in Map (updateSize)           |     85079 bytes |         skipped |         skipped |    122090 bytes |
|[B3.2] 20√N clients concurrently set Object in Map (encodeTime)           |            7 ms |         skipped |         skipped |            9 ms |
|[B3.2] 20√N clients concurrently set Object in Map (docSize)              |     32232 bytes |         skipped |         skipped |    120527 bytes |
|[B3.2] 20√N clients concurrently set Object in Map (memUsed)              |             0 B |         skipped |         skipped |        293.7 kB |
|[B3.2] 20√N clients concurrently set Object in Map (parseTime)            |          101 ms |         skipped |         skipped |          126 ms |
|[B3.3] 20√N clients concurrently set String in Map (time)                 |          106 ms |         skipped |         skipped |          177 ms |
|[B3.3] 20√N clients concurrently set String in Map (updateSize)           |   7826229 bytes |         skipped |         skipped |   7852460 bytes |
|[B3.3] 20√N clients concurrently set String in Map (encodeTime)           |            5 ms |         skipped |         skipped |           17 ms |
|[B3.3] 20√N clients concurrently set String in Map (docSize)              |     36825 bytes |         skipped |         skipped |   7847822 bytes |
|[B3.3] 20√N clients concurrently set String in Map (memUsed)              |        380.8 kB |         skipped |         skipped |            8 MB |
|[B3.3] 20√N clients concurrently set String in Map (parseTime)            |          101 ms |         skipped |         skipped |          204 ms |
|[B3.4] 20√N clients concurrently insert text in Array (time)              |           79 ms |         skipped |         skipped |           41 ms |
|[B3.4] 20√N clients concurrently insert text in Array (updateSize)        |     52747 bytes |         skipped |         skipped |     82050 bytes |
|[B3.4] 20√N clients concurrently insert text in Array (encodeTime)        |            2 ms |         skipped |         skipped |           12 ms |
|[B3.4] 20√N clients concurrently insert text in Array (docSize)           |     26592 bytes |         skipped |         skipped |    102061 bytes |
|[B3.4] 20√N clients concurrently insert text in Array (memUsed)           |        793.4 kB |         skipped |         skipped |            1 MB |
|[B3.4] 20√N clients concurrently insert text in Array (parseTime)         |           89 ms |         skipped |         skipped |          144 ms |
|[B4] Apply real-world editing dataset (time)                              |         1366 ms |         skipped |         skipped |        12618 ms |
|[B4] Apply real-world editing dataset (encodeTime)                        |           19 ms |         skipped |         skipped |           11 ms |
|[B4] Apply real-world editing dataset (docSize)                           |    159929 bytes |         skipped |         skipped |    153794 bytes |
|[B4] Apply real-world editing dataset (parseTime)                         |           63 ms |         skipped |         skipped |           61 ms |
|[B4] Apply real-world editing dataset (memUsed)                           |          2.9 MB |         skipped |         skipped |          2.2 MB |
|[B4] Apply real-world editing dataset (receiveTime)                       |         7670 ms |         skipped |         skipped |         1951 ms |
|[B4x100] Apply real-world editing dataset 100 times (time)                |       189737 ms |         skipped |         skipped |      2325143 ms |
|[B4x100] Apply real-world editing dataset 100 times (encodeTime)          |         1008 ms |         skipped |         skipped |         1666 ms |
|[B4x100] Apply real-world editing dataset 100 times (docSize)             |  15989245 bytes |         skipped |         skipped |  16255106 bytes |
|[B4x100] Apply real-world editing dataset 100 times (parseTime)           |         3511 ms |         skipped |         skipped |         5365 ms |
|[B4x100] Apply real-world editing dataset 100 times (memUsed)             |        343.5 MB |         skipped |         skipped |        259.7 MB |

