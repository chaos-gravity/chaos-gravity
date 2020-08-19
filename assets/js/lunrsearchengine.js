
var documents = [{
    "id": 0,
    "url": "https://chaos-gravity.github.io/404.html",
    "title": "404",
    "body": "404 Page not found!Please use the search bar from the bottom left or visit our homepage! "
    }, {
    "id": 1,
    "url": "https://chaos-gravity.github.io/about",
    "title": "A website focus in AI",
    "body": "If you are interested in our team, and you want to get information about us at the first time. You can scan the picture below by WeChat. [It’s our WeChat Public Account named chaos-gravity. ] Have Fun! "
    }, {
    "id": 2,
    "url": "https://chaos-gravity.github.io/authors",
    "title": "A website focus in AI",
    "body": "If you are interested in our team, and you want to get information about us at the first time. You can scan the picture below by WeChat. [It’s our WeChat Public Account named chaos-gravity. ] Have Fun! "
    }, {
    "id": 3,
    "url": "https://chaos-gravity.github.io/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 4,
    "url": "https://chaos-gravity.github.io/contact",
    "title": "Contact",
    "body": "  Please send your message to Chaos万有引力. We will reply as soon as possible!   "
    }, {
    "id": 5,
    "url": "https://chaos-gravity.github.io/",
    "title": "Home",
    "body": "                                                                                               换个思路实现人工智能: 在视觉环境中用因果归纳完成目标导向的任务——策略学习模型              :       上篇：换个思路实现人工智能: 在视觉环境中用因果归纳完成目标导向的任务——因果归纳模型:                                                                               Beer                 19 Aug 2020                                                                                                                           Cross Entropy Loss              :       交叉熵度量的是两个概率分布的差异。:                                                                               Beer                 03 Aug 2020                                                                                                                           Softmax              :       ​		Softmax，这个概念参考[1]解释的非常仔细，这里只做简述，先上公式：:                                                                               Beer                 09 Jul 2020                                                                                                                           Hello, World!              :       现在是2020年2月22日，总觉得该做点什么。:                                                                               Beer                 22 Feb 2020                                "
    }, {
    "id": 6,
    "url": "https://chaos-gravity.github.io/wechat",
    "title": "A website focus in AI",
    "body": "If you are interested in our team, and you want to get information about us at the first time. You can scan the picture below by WeChat. [It’s our WeChat Public Account named chaos-gravity. ] Have Fun! "
    }, {
    "id": 7,
    "url": "https://chaos-gravity.github.io/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ “sitemap. xml”   absolute_url }}   "
    }, {
    "id": 8,
    "url": "https://chaos-gravity.github.io/%E6%8D%A2%E4%B8%AA%E6%80%9D%E8%B7%AF%E5%AE%9E%E7%8E%B0%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD-%E5%9C%A8%E8%A7%86%E8%A7%89%E7%8E%AF%E5%A2%83%E4%B8%AD%E7%94%A8%E5%9B%A0%E6%9E%9C%E5%BD%92%E7%BA%B3%E5%AE%8C%E6%88%90%E7%9B%AE%E6%A0%87%E5%AF%BC%E5%90%91%E7%9A%84%E4%BB%BB%E5%8A%A1-%E7%AD%96%E7%95%A5%E5%AD%A6%E4%B9%A0%E6%A8%A1%E5%9E%8B/",
    "title": "换个思路实现人工智能: 在视觉环境中用因果归纳完成目标导向的任务——策略学习模型",
    "body": "2020/08/19 - 上篇：换个思路实现人工智能: 在视觉环境中用因果归纳完成目标导向的任务——因果归纳模型 系列第一篇：换个思路实现人工智能: 在视觉环境中用因果归纳完成目标导向的任务(上) 今天我们来说一说《CAUSAL INDUCTION FROM VISUAL OBSERVATIONS FOR GOAL DIRECTED TASKS》实验中策略学习模型的部分。这篇是这篇论文的终篇。终于从坑里爬出来啦。 官方源代码地址： https://github. com/StanfordVL/causal_induction策略学习模型(Learning Goal-Conditioned Policies) python3 learn_planner. py --horizon 7 --num 7 --fixed-goal 0 --structure one_to_one --method trajFi --seen 10 --images 1 --data-dir output/先回顾一下各个参数的意思： horizon是上图中H的值，num是开关或灯的数量，–fixed-goal是指学习是否是goal conditioned，如果–fixed-goal=0，那表示有多个目标，是goal-conditioned。structure是开关和灯的控制模式，有如下四类： 每一类都可以组合出非常多不同的因果关系，比如说One-to-One这种情况，如果有七组开关和灯，那么开关和灯之间可以有5040种不同的因果关系。在训练因果模型的过程中，给的训练数据会包含一些因果关系，最后需要测试训练好的agent在它从未见过的因果关系上的效果。seen这个参数用于设定参与因果归纳模型训练的因果关系的数量，在这篇论文中，seen这个值会被设为10，50，100和500来做实验。images这个参数如果设定为1，表示因果模型训练的输入是场景图片，而如果设为0，则因果模型的训练输入是灯的状态向量。data_dir，数据的存储路径。 method是这篇最重要的一个参数，在这篇，method分三大类，第一类是gt，gt是ground truth的意思，即参与策略模型训练的因果关系用的是真实的因果关系，而不是通过因果归纳模型得到的因果关系。第二类则有用因果归纳模型，和上篇的对应是，trajF为TCIN，trajFia是ICIN，trajFi为ICIN (No Attn)，即参与策略模型训练的因果关系是由因果模型推断出来的，而不是绝对正确的。第三类是trajlstm，是2019年在ICLR发表的一篇解决相同问题的方法《Causal Reasoning from Meta-reinforcement Learning》，用的是lstm网络，基本思路是先将所有开关操作一遍，并将场景图和操作输入网络，期望网络能归纳出因果关系，之后再输入场景图和目标图，得到策略。 memsize = 10000memory = {'state':[], 'graph':[], 'action':[]}​  memory是训练过程中记录信息的，其中state记录的是当前场景图和目标场景图，graph记录的是因果向量，action记录的是接下来应该要执行的动作，这里要注意，可以把这里的记录的action看成是ground truth，而这个action并不一定会被策略选中，和下一步真正执行的action又是不同的。而memsize则用来控制memory的长度。 策略学习模型调用： if args. method=='trajlstm':  pol = BCPolicyMemory(args. num, args. structure). cuda()else:  pol = BCPolicy(args. num, args. structure, True). cuda()optimizer = th. optim. Adam(pol. parameters(), lr=0. 0001)trajlstm用BCPolicyMemory做策略学习模型，其他用BCPolicy做策略学习模型，这两个策略模型相似度高，可以一起看: 1. BCPolicy和BCPolicyMemory： BCPloclicy要实现的是下面这个策略学习网络，结合了因果归纳和Attention机制，而BCPolicyMemory是一个基于LSTM的策略学习网络。 1. 1 初始化 两个网络初始化部分不相同，上图是BCPolicy的网络结构图，有attention机制，BCPolicyMemory没有： def __init__(self, num, structure, attention = False): #BCPolicydef __init__(self, num, structure): #BCPolicyMemory定义了三个相同的卷积池化激励层和一个全连接层，这部分主要用来做图的encoding，将目标场景图和状态场景图转换成一个向量： self. encoder_conv = nn. Sequential(  nn. Conv2d(6, 8, kernel_size=3, stride=1, padding=1), # 32×32×6-&gt;32×32×8  		    nn. MaxPool2d(kernel_size=2, stride=2), # 32×32×8-&gt;16×16×8  nn. ReLU(inplace=True),)self. encoder_conv2 = nn. Sequential(  nn. Conv2d(8, 16, kernel_size=3, stride=1, padding=1), # 16×16×8-&gt;16×16×16  nn. MaxPool2d(kernel_size=2, stride=2), # 16×16×16-&gt;8×8×16  nn. ReLU(inplace=True),)self. encoder_conv3 = nn. Sequential(  nn. Conv2d(16, 32, kernel_size=3, stride=1, padding=1), # 8×8×16-&gt;8×8×32    nn. MaxPool2d(kernel_size=2, stride=2), # 8×8×32-&gt;4×4×32    nn. ReLU(inplace=True),)self. fc1 = nn. Linear(4 * 4 * 32, 128) # 4×4×32-&gt;128BCPolicy的其他部分，不全，只贴有部分： self. attlayer = nn. Linear(128, num) # 128-&gt;numself. softmax = nn. Softmax(dim=-1)  # 对最后那个维度做Softmaxif structure ==  masterswitch :  self. ins = self. num + 1     # masterswitch的gt向量比其他结构的gt向量长num,最后num个位置记录的是master switch的位置。else:  self. ins = self. numif not self. att:          # 如果没有attention机制  if structure ==  masterswitch :    self. gfc1 = nn. Linear(num*num + num, 128) # num*(num+1) -&gt; 128  else:    self. gfc1 = nn. Linear(num*num, 128) # num*num-&gt;128else:  self. gfc1 = nn. Linear(self. num, 128) # num-&gt;128if self. structure ==  masterswitch :  self. fc2 = nn. Linear(256+args. num, 64) # 256+num -&gt;64else:  self. fc2 = nn. Linear(256, 64) # 256-&gt;64self. fc5 = nn. Linear(64, num) # 64 -&gt; numself. softmax = nn. Softmax(dim=-1) # 对最后一维做softmax]masterswitch的gt向量比其他结构的gt向量长num个，记录的是master switch的位置。 BCPolicyMemory其他部分： self. aenc = nn. Linear(num+1, 128) # num+1 -&gt; 128self. lstm = nn. LSTMCell(256, 256) self. fc2 = nn. Linear(256, 64) # 256-&gt;64self. fc5 = nn. Linear(64, num) # 64-&gt;num这段代码的核心是lstm的定义，用的是LSTMCell，这篇就不提LSTM的网络结构和特点了，只说一下，pytorch中除了LSTMCell，还有一个LSTM，可以直接构造多层LSTM。那LSTMCell不能直接构造多层结构，即一个Cell，第一个参数是feature的长度，第二个参数是记忆单元和隐藏单元hidden的长度。 1. 2 BCPolicy和BCPolicyMemory前向传播forward部分： 不同：函数入口 def forward(self, x, gr):  # BCPolicydef forward(self, x, a, hidden): # BCPolicyMemory两个网络的输入x都是goal image和current image组合的32×32×6的tensor。gr是开关和灯的因果关系向量，当method是gt的时候，gr是真实的因果关系向量，是groud truth。而当method是trajF，trajFia，或trajFi时，gr则是因果归纳模型归纳出的因果关系向量。 当method是trajlstm时，用的策略模型是BCPolicyMemory，其中x是场景图，a是动作，hidden则是LSTM的记忆单元和隐藏单元。 相同：如网络结构图，goal image和current image组合的32×32×6的tensor x都会经过一个Observation Encoder输出e3,再经过全连接层输出encoding: x = x. permute(0, 3, 1, 2). contiguous() # 维度换位，将通道维度移前e1 = self. encoder_conv(x)    # 32×32×6-&gt;16×16×8e2 = self. encoder_conv2(e1)   # 16×16×8-&gt;8×8×16e3 = self. encoder_conv3(e2)   # 8×8×16-&gt;4×4×32e3 = e3. view(e3. size(0), -1)  # 转成一维向量，前面是batchsize, 后面是向量长度encoding = self. relu(self. fc1(e3))  # 4×4×32-&gt;128BCPolicy的其他部分： if self. att:  w = self. softmax(self. attlayer(encoding)) # 128-&gt;num, softmax  if self. structure ==  masterswitch : # 将master switch的因果关系与其他因果关系的分开    ms = gr. view((-1, self. ins, self. num))[:, -1, :]    gr = gr. view((-1, self. ins, self. num))[:, :-1, :]  else:    gr = gr. view((-1, self. ins, self. num))  gr_sel = th. bmm(gr, w. view(w. size(0), -1, 1)) # 因果关系矩阵×状态和目标向量 -&gt;num  gr_sel = gr_sel. squeeze(-1)  # 若最后一维长度为1,消去  g1 = self. relu(self. gfc1(gr_sel)) # num-&gt;128else:  g1 = self. relu(self. gfc1(gr))  # num*(num+1)-&gt; 128 或者 num*num-&gt; 128if self. structure ==  masterswitch :  eout = th. cat([g1, encoding, ms], 1) # 128 + 128 + numelse:  eout = th. cat([g1, encoding], 1)   # 128 + 128a = self. relu(self. fc2(eout))   # 256+num -&gt; 64 或者 256 -&gt; 64 a = self. fc5(a)  # 64 -&gt; numreturn a如果有attention机制，首先会让状态场景图和目标场景图融合生成的encoding经过一个全连接层，生成因果关系图的attention向量，和因果关系相乘，得到需要重点关注的因果关系，然后再转换成因果向量，和encoding融合后通过两层全连接层得到最后的动作向量。 归纳为公式，则是： s是状态场景图，g是目标场景图，E对应的就是网络结构图中的Observation Encoder，φi是全连阶层，α是attention向量，Ĉ是因果归纳模型预测的因果关系，e是selected edges，a是模型提议的策略。 BCPolicyMemory其他部分： ae = self. relu(self. aenc(a)) # num+1 -&gt; 128eout = th. cat([ae, encoding], 1) # 128+128-&gt;256if hidden is None:  hidden = self. lstm(eout)else:  hidden = self. lstm(eout, hidden) # （256，256）a = self. relu(self. fc2(hidden[0])) # 256-&gt;64a = self. fc5(a)  # 64 -&gt; numreturn a, hidden这里每次都会输入一个action向量，将其转换成128长的向量，然后再和128长的场景图向量拼接在一起组成一个256长的向量，最开始的时候hidden不做输入，之后就用上一次跑lstm产生的hidden来做输入，这里的hidden包含了lstm中的隐藏单元和记忆单元，接下来提取隐藏单元，通过两层全连接网络生成动作向量。 2. 策略训练代码：  method有三大类，gt是一类，gt是ground truth的意思，也就是说参与策略模型训练的因果关系用的是真实的因果关系，而第二类method，trajF，trajFi，或trajFia，参与训练的因果关系则是因果模型计算得到的因果关系，不是真正的因果关系。第三类method是trajlstm，这个方法没有独立的因果归纳模型，但是其实有因果归纳的步骤。每一类都有一组训练代码，重合度很高，所以一起讲。 2. 1 初始化环境： 三类method都是相同的 l = LightEnv(args. horizon*2, args. num,  gt , args. structure, gc, filename=fname, seen = args. seen)l. keep_struct = False和之前初始化环境不同的是horizon位置上的输入变成了2×args. horizon，决定了l. step()的最长步数。cond的输入变成了”gt”，l. _get_obs()函数输出的状态向量o会包含l. gt，即现在这个环境使用的因果向量，而l. _get_obs(images=True)只会返回当前因果和开关状态下的场景图。如果l. keep_struct = False，那么每次l. reset()都有可能会改变因果关系 当method是trajlstm是，memsize设定为了100。 memsize = 1002. 2 策略训练训练： 相同的部分： for mep in range(100000):  l. train = True  l. reset()  imobs = l. _get_obs(images=True)  goalim = l. goalim  goal = l. goal  obs = np. zeros((args. num))l. train为真，那么l. reset()的时候，会从训练模型可见的那些因果关系中选择一个因果关系来训练，seen为训练模型过程中可见的因果关系的数量，这部分详细内容请参考换个思路实现人工智能: 在视觉环境中用因果归纳完成目标导向的任务——生成数据。imobs获得的是l在reset之后获得的新的场景图。goalim是目标场景图，goal是灯的状态向量。 不同的部分： 当method是trajF，trajFi，或trajFia时： ## Predict Graphbuf = induction(args. structure,args. num, args. horizon, l, images=args. images)traj = buf. flatten()pred = predict(buf, FN, args. structure, args. num)l. state = np. zeros((args. num)) induction函数与因果模型训练的代码重合度很高，就不逐行解析了，这部分主要功能就是将每个开关都开一遍，然后记录下场景图和之后要执行的动作，存入buf中，而当结构是masterswitch的时候，稍微复杂了一些，先将所有开关开一遍并记录下场景图和动作，直到找到master switch为止，再将剩下的开关逐个开一遍，记录下场景图和之后要执行的动作。predict中输入的FN是之前训练好的因果归纳模型，输出则是因果关系向量。 当method是trajlstm时： memory = {'state':[], 'graph':[], 'action':[]}hidden = None## Get interction trajectorybuf = induction(args. structure,args. num, args. horizon, l, images=args. images)memory['graph']. append(buf)for w in range(buf. shape[0]):  states = buf[w, :32*32*3]. reshape(1, 32, 32, 3)  sgg = np. zeros_like(states)  states = np. concatenate([states, sgg], -1)  actions = buf[w, 32*32*3:]. reshape(1, -1)  act, hidden = pol(th. FloatTensor(states). cuda(), th. FloatTensor(actions). cuda(), hidden)l. state = np. zeros((args. num))之前说过induction函数，即把所有的开关按顺序开一遍，记录场景图和之后的动作，在trajlstm这个方法中，直接将这样产生的buf存入memeory中的graph部分，意思很明显了，即buf里面有因果图。接下来就是跑lstmcell，将这个开关所有灯的行为依次输入lstm，states是当下的场景图，而actions是接下来要做的动作，输出也是接下来要做的动作。这部分的主要功能应该是让hidden中有灯和开关的因果关系。 每个episode: for k in range(args. horizon*2):  g = np. abs(goal - obs[:args. num]) # 目标向量-状态向量  st = np. concatenate([imobs, goalim], 2) #32×32×6  sss = 1. 0*(np. dot(g, l. aj. T). T &gt; 0. 5)   if args. structure ==  masterswitch :    sss[l. ms] = 0    if sss. max() == 0:    #如果没有需要改变的开关，就结束该过程      break  action = np. argmax(sss)   #应该要执行的action  if args. structure ==  masterswitch :    if obs[:5]. max() == 0:  #里面的参数5似乎应该改成args. num      action = l. ms     #首先要打开masterswitch的开关    memory['state']. append(st)  memory['action']. append(action)g是目标向量减去状态向量，表示要达到目标向量需要做出的改变。st则融合了当前场景图和目标场景图，在通道维度上融合，因此融合后得到的st是32×32×6的结构。g是需要作出改变的灯向量，sss则是需要做出改变的开关向量。如果是masterswitch的状态，一开始除了master switch之外没有开关再需要改变了，那么过程不需要再进行下去。如果有开关需要改变，则一开始要打开master switch，否则其他开关开了也没用。这里obs[:5]中的5似乎应该改成args. num。这边的action则是应该要被选择的action。 接下来一段代码，三种方法不同：  method == “gt”:memory['graph']. append(l. gt. flatten())if np. random. uniform() &lt; 0. 3:  action = np. random. randint(args. num)else:  graph = np. expand_dims(l. gt. flatten(), 0)  act = pol(th. FloatTensor(np. expand_dims(st, 0)). cuda(), th. FloatTensor(graph). cuda())   action = act[0]. argmax()  # 策略选择的action当method是gt时，memory[‘graph’]存的是真实的因果关系向量。st和graph经过pol函数产生action向量，然后再取最佳action。这边是策略选择的最后会被执行的action。 在强化学习模型训练过程中，不会总去执行策略模型当下觉得最优的动作，也会随机选择一些动作，以便最后能找到最优的策略。  method == “trajF”，”trajFi”，或”trajFia”memory['graph']. append(pred. flatten())## Random Noiseif np. random. uniform() &lt; 0. 3:  action = np. random. randint(args. num)else:  graph = np. expand_dims(pred. flatten(), 0)  act = pol(th. FloatTensor(np. expand_dims(st, 0)). cuda(), th. FloatTensor(graph). cuda())   action = act[0]. argmax()这个循环内因果关系并不会变，所以graph可以放在这个循环外生成，没必要每次都产生一遍。  method = “trajlstm”时：## Policy Noiseif np. random. uniform() &lt; 0. 3:	action = np. random. randint(args. num)else:  act, s_hidden = pol(th. FloatTensor(states). cuda(), th. FloatTensor(actions). cuda(), hidden)  action = act[0]. argmax()这段代码应该是写错了，每次都输入states和actions，并没有用到每次l. step之后的状态，也没有用到goal image，有点不合逻辑。因此，正确的应该是要将states替换成st，而actions替换成都是0的向量，因为这里是要去预测下一步的动作。 接下来一段三种方法相同： obs, reward, done, info = l. step(action)imobs = l. _get_obs(images=True)if done:  break在环境中执行action，返回obs（更新灯的状态向量+目标向量+因果向量），reward（目标和状态的欧几里德距离的负值），done（达到目标或者步数超过限制则结束），info（灯的状态向量是否和目标一致），imobs（更新状态场景图），如果达到目标，或者步数超过限制，则结束该过程。 接下来，不同的部分，当method是gt，trajF，trajFi，或trajFia时： if args. structure ==  masterswitch :  if sss[l. ms]:    st = np. concatenate([imobs, goalim], 2)    memory['state']. append(st)    #--------------下面代码是method不同，不同的部分-------------        # 当method是“gt”    memory['graph']. append(l. gt. flatten())    # 当method是 trajF ， trajFi ，或 trajFia 时    memory['graph']. append(pred. flatten())    #---------------------------------------------        memory['action']. append(l. ms)    obs, reward, done, info = l. step(l. ms)memory['state'] = memory['state'][-memsize:]memory['graph'] = memory['graph'][-memsize:]memory['action'] = memory['action'][-memsize:]for _ in range(1):  loss = train_bc(memory, pol, optimizer)这段代码有两点很让人疑惑：    首先是masterswitch的部分，按照代码的意思是，如果结构是masterswitch且master switch被打开了，那么则需要将主开关关上。     不论因果结构是什么样的，在最后一个action之后的状态都没有被记录。可能是没有下一步动作的话，场景图记录下来也没有训练价值。  这部分有个函数train_bc： def train_bc(memory, policy, opt):  '''Train Imitation policy'''  if len(memory['state']) &lt; 50:    return  opt. zero_grad() # 梯度清零，不清零的话可以写梯度累加的代码，适合GPU配置低，显存小的状况。  choices = np. random. choice(len(memory['state']), 32). astype(np. int32). tolist()  states = [memory['state'][c] for c in choices]  graphs = [memory['graph'][c] for c in choices]  actions = [memory['action'][c] for c in choices]  states = th. FloatTensor(states). cuda()  graphs = th. FloatTensor(graphs). cuda()  actions = th. LongTensor(actions). cuda()  # 模型觉得最优的动作  pred_acts = policy(states, graphs)  # loss = ((pred_acts -actions)**2). sum(1). mean()  celoss = nn. CrossEntropyLoss()  loss = celoss(pred_acts, actions)  l = loss. cpu(). detach(). numpy()  loss. backward()  opt. step()  return lzero_grad()是用于梯度清零，不清零的话梯度就会累加，在一些实验中，batch size设置的大，显存会不够用，所以可以不清零梯度，多累加几个batch size，比如将batch size设置为100，而梯度累加八次再清零和将batch size直接设置为800，每次都梯度清零，效果是一样的。 在这个实验中，每次从memory中随机选择32个来计算梯度。 当method是”trajlstm”时： if args. structure ==  masterswitch :  if sss[l. ms]:    st = np. concatenate([imobs, goalim], 2)    memory['state']. append(st)    memory['action']. append(l. ms)    obs, reward, done, info = l. step(l. ms)if len(memory['state']) != 0:  trajs. append(memory)trajs = trajs[-memsize:]for _ in range(1):  loss = train_bclstm(trajs, pol, optimizer)这里依然是，如果结构是masterswitch且主开关开着，就需要多走一步，将主开关关上。接下来看train_bclstm这个函数，trajs是最近的memsize个开关灯的过程，一开始会小于memsize个。pol是生成action的模型。下面贴了一部分代码，掐头去尾。 choices = np. random. choice(len(trajs), 4). astype(np. int32). tolist()for t in choices:  memory = trajs[t]  hidden = None  ## Feed interaction trajectory through policy with memory  buf = memory['graph'][0]  for w in range(buf. shape[0]):    states = buf[w, :32*32*3]. reshape(1, 32, 32, 3)    sgg = np. zeros_like(states)    states = np. concatenate([states, sgg], -1)    actions = buf[w, 32*32*3:]. reshape(1, -1)    num_acts = actions. shape    act, hidden = pol(th. FloatTensor(states). cuda(), th. FloatTensor(actions). cuda(), hidden)  states = np. array(memory['state'])  actions = np. array(memory['action'])  preds = []  for w in range(states. shape[0]):    a = np. zeros(num_acts)    pred_acts, hidden = pol(th. FloatTensor(states[w:w+1]). cuda(), th. FloatTensor(a). cuda(), hidden)    preds. append(pred_acts)  preds = th. cat(preds, 0)  loss = celoss(preds, th. LongTensor(actions). cuda())  totalloss += loss前半段代码中的循环，应当是为了得到hidden的值，理想状况，我们期待这个值记录着接下来要做的动作，和灯和开关之间的因果关系。而接下来一个循环，则是要生成理想状况下应当产生的动作组和在该策略模型下产生的动作组的差异。损失函数用的是交叉熵。 接下来是最后一段代码，三个方法有不同的部分：   if mep % 1000 == 0:    print( Episode , mep,  Loss:  , loss )    # method是“gt”时：    trainsc = eval_bc(pol, l, True, args=args)          testsc = eval_bc(pol, l, False, args=args)          # 当method是 trajF ， trajFi ，或 trajFia 时：    trainsc = eval_bc(pol, l, True, f=FN, args=args)    testsc = eval_bc(pol, l, False, f=FN, args=args)    # 当method是 trajlstm 时：    trainsc = eval_bclstm(pol, l, True, args=args)    testsc = eval_bclstm(pol, l, False, args=args)  successes. append(l. _is_success(obs))print(np. mean(successes))要是之前的代码都看懂了，eval_bc和eval_bclstm很容易懂，就不专门贴出来了，输入pol，用来计算action，而第三个参数输入True，表示用用于训练的因果关系来测试模型效果，输入False，表示用用于测试的因果关系来测试模型效果，用于测试的因果关系是训练模型过程中，模型没有接触过的因果关系。 3. 实验结果 这个图表现的是策略学习模型的实验结果，Memory指的是trajlstm，Oracle是gt，其他分别对应不同的因果归纳模型，毫无疑问，所有实验中，Oracle的效果是最好的，因为因果关系用的是ground truth。接下来就是用ICIN(Ours)了，即带attention的因果归纳模型。值得注意的是，这个实验结果用的是因果归纳模型和策略学习模型没有见过的因果关系来测试的。至于Memory和Memory(RL/Low Dim)的区别，在代码中没有体现出来，trajlstm只有一个版本。 另外，这是当switch的数量是5，训练时可见的因果关系为50时，网络有attention和没有attention的区别。 记：    文章并没有把所有代码都贴上了，只贴了觉得有必要说明的，另外代码中有很多不必要的部分，可能是作者测试的时候遗留的，因此有些代码稍作了修改。     trajlstm的代码应该是写错了。     obs[:5]中的5似乎应该改成args. num。  上篇：换个思路实现人工智能: 在视觉环境中用因果归纳完成目标导向的任务——因果归纳模型 系列第一篇：换个思路实现人工智能: 在视觉环境中用因果归纳完成目标导向的任务(上) 参考论文： Suraj Nair, Yuke Zhu, Silvio Savarese, Li Fei-Fei, Stanford University, CAUSAL INDUCTION FROM VISUAL OBSERVATIONS FOR GOAL DIRECTED TASKS, 2019 参考代码： https://github. com/StanfordVL/causal_induction ​ ​ "
    }, {
    "id": 9,
    "url": "https://chaos-gravity.github.io/cross-entropy-loss/",
    "title": "Cross Entropy Loss",
    "body": "2020/08/03 - 交叉熵度量的是两个概率分布的差异。 要理解交叉熵，有很多小概念需要理解。 信息量，一个事件发生的概率越大，事件发生携带的信息量越小，发生的概率越小，事件发生携带的信息量越大。比如太阳从东边升起，这个事件如果发生了，我们可以从这个事件中获得的信息几乎是没有的。但是，如果哪天太阳从西边升起了，那么我们从这个事件中获得的信息量是极大的，一定发生了什么，或者即将发生什么，才造成了这个事件发生。 假设X是一个离散型随机变量，概率分布函数为： 则定义X = x0事件发生携带的信息量为： 若p(x0)为0，也就是事件x0是不可能发生的事件，但是它却发生了，那么这个事件的信息量是无穷大的，I(x0)的值无穷大，如果p(x0)为1，也就是事件x0是一定会发生的事件，那么这个事件的发生是不带信息量的，I(x0)的值是0。 另外，信息量可以这样理解 [2]： Information quantifies the number of bits required to encode and transmit an event. 信息量可以被理解为，传输或表达这个信息需要的编码的位数。 信息熵，则是信息量的期望值： 参考[3]里给了一个例子： 每次开电脑，都可能会产生三种状况，电脑正常开机的概率是0. 7，电脑无法开机的概率是0. 2，电脑爆炸的概率是0. 1。那么每次开机，得到的信息量的的期望值是： 如果是二项分布，那么信息熵的计算可以简化为： 事件的概率不均，信息熵较小，若各个事件发生的概率一样，信息熵较大。 信息熵在[2]中的描述为： Entropy is the number of bits required to transmit a randomly selected event from a probability distribution. 熵是表达或者传输一个遵循特定概率分布的随机事件需要的位数，个人觉得the number of应该改成the average number of，位数前面应该有个平均，和期望的概念对应上。但也可能是我哪里理解错了。 相对熵(relative entropy)，又称之为KL散度(Kullback-Leibler (KL) divergence)，公式： 相对熵的目标是：计算用P描述目标问题，比Q描述目标问题能获得的信息增量。 如果分布P和分布Q是一样的，那么相对熵是0，如果不一样，相对熵大于0，越大，表示两种分布之间的差距越大。 在机器学习的项目中，通常P表示真实的分布，即需要训练模型达到的分布，Q是现在用的模型预测的分布。 相对熵在参考[2]中的描述是： In other words, the KL divergence is the average number of extra bits needed to encode the data, due to the fact that we used distribution q to encode the data instead of the true distribution p. — Page 58, Machine Learning: A Probabilistic Perspective, 2012. 交叉熵是，当我们用分布q来替代事件真实遵循的分布p时，传输和表达事件时，比使用分布p多需要的平均位数。也就是q是我们用的分布，p是事件真实遵循的分布，用q的话，比用p需要更多的位数来表达和传输这个事件，平均多多少呢，交叉熵就是这个多出来的多少。 交叉熵(Cross entropy)，将相对熵公式变形： 前半部分是信息熵的负值，后半部分则是交叉熵，交叉熵的公式是： 因为P的信息熵是一定的，那么其实是可以省略这部分计算的，交叉熵和相对熵的意义是一样的。只是最后计算出的值，区间不一样。 交叉熵在参考[2]中的描述是： …, the cross entropy is the average number of bits needed to encode data coming from a source with distribution p when we use model q, … — Page 57, Machine Learning: A Probabilistic Perspective, 2012 交叉熵是当你用模型q来预测分布p时，表达和传输事件需要的平均位数。 以下定义来自参考[2]，俺就不翻了: Cross-Entropy: Average number of total bits to represent an event from Q instead of P. Relative Entropy (KL Divergence): Average number of extra bits to represent an event from Q instead of P. Cross-Entropy Loss 和 Softmax Loss 毫无疑问，交叉熵可以用作损失函数，且比起MSE，MAE，要优秀不少， … using the cross-entropy error function instead of the sum-of-squares for a classification problem leads to faster training as well as improved generalization. — Page 235, Pattern Recognition and Machine Learning, 2006.  结合上面猫狗分类的案例，假如有一张猫图输入，P是[1, 0], Q是[0. 71, 0. 29]，交叉熵的计算为： H(P, Q) = – (P(cat) * log(Q(cat)) + P(dog) * log(Q(dog))) 值得注意的是，在很多多分类问题中，不论有多少类，P不论有多少个元素，都只有一个为1，其他都为0，所以交叉熵的计算可以化简，也就是说如果P(cat)为1，那么交叉熵的结果和Q(dog)，Q(car)，Q(any other)是无关的： H(P, Q) = – log(Q(cat)) 因此，如果Q(cat)是用Softmax Function计算出来的，那么H(P, Q)计算得到的就是该样本在该模型下的Softmax Loss。 Softmax Function专门有一篇：Softmax Softmax Loss的完整公式如下： N是样本数量，n是class的数量，特征向量的长度为d，Wj是W的第j列，和b一起是获得特征向量的全连接层，W是d*n，bj的长度是n。log后面则是用Softmax Function计算出的‘Q(cat)’。 因此，其实本来没有什么Softmax Loss的概念，这个公式是在多分类任务中使用Softmax Function+Cross Entropy loss产生的。 Cross Entropy Loss 和 Log Loss [4] 她俩在解决二分类问题的时候，其实是一回事，不服气的看公式： 这个公式既叫Binary Cross-Entropy，也叫Log Loss，y是label，p(y)是预测结果，符号和之前的公式没有一一对应，看的时候注意一下。 Log Loss的推导基于最大似然估计(Maximum Likelihood)和伯努利分布(Bernoulli distribution)，有机会写一篇。 那么Cross Entropy的值为多少时，表示预测的结果还挺准确的呢？这里参考[2]给了个一些参考，具体问题还要具体分析。 Cross-Entropy = 0. 00: Perfect probabilities. Cross-Entropy &lt; 0. 02: Great probabilities. Cross-Entropy &lt; 0. 05: On the right track. Cross-Entropy &lt; 0. 20: Fine. Cross-Entropy &gt; 0. 30: Not great. Cross-Entropy &gt; 1. 00: Terrible. Cross-Entropy &gt; 2. 00 Something is broken. 参考： [1] Thomas Wood，Softmax Function Definition, DeepAI [2] Jason Brownlee，A Gentle Introduction to Cross-Entropy for Machine Learning，2019 [3] 史丹利复合田，一文搞懂交叉熵在机器学习中的使用，透彻理解交叉熵背后的直觉，CSDN，2018 [4] Daniel Godoy, Understanding binary cross-entropy / log loss: a visual explanation, Towards Data Science, 2018 "
    }, {
    "id": 10,
    "url": "https://chaos-gravity.github.io/Softmax/",
    "title": "Softmax",
    "body": "2020/07/09 - ​		Softmax，这个概念参考[1]解释的非常仔细，这里只做简述，先上公式： 这公式是啥子意思呢？先看一个应用： ​		假如我们现在有一个分类任务，如果模型足够理想，输入一张猫图，输出[1, 0]，输入一张狗图，输出[0, 1]。通常这种任务，前面会是一个深度卷积神经网络，最后会有一个全连接层，经过这个全连接层会得到图的特征向量(embedding)，我自己喜欢管embedding叫特征向量。上图中最后得到的特征向量是[1. 2, 0. 3]，再经过softmax： 得到了[0. 71, 0. 29]，我们可以这样理解最后这个结果，这张图是猫的概率是0. 71，是狗的概率是0. 29，它们两加起来是1，不管softmax的输入向量为何，输出向量里的值相加一定是1，得到的结果可以理解为图在各个类上的概率分布，向量的长度即类别（class）的数量。再以一个长度为3的一维向量为例： 假设你现在要训练一个模型，它需要有能力分辨猫，狗，鸟，你模型训练好以后，输入了一张鸟图，得到了一个这样的特征向量，现在要做softmax，计算步骤如下：  ​		所以按模型判断，该图是鸟图的概率是0. 0003，明显这个模型不准诶。 ​		softmax还可用于增强学习（reinforcement learning），先上公式： ​		在机器视觉领域，softmax的输出，是图像在各个类别上的概率分布，在增强学习领域，softmax的输出可以是各个策略的在某个步骤或时间会被采取的可能性。公式中a是我们可以选的行动，t表示的是步骤或者时间，τ是系统温度，这个值越高，模型越冲动，越会去探索新的可能。qt(a)是从现在已知的情况来看，选择行动a会获得成功的概率，Pt(a)则是模型在t这个步骤或时间上会采取a行动的概率。 ​		想象一下，我们正在训练一种强化学习模型。我们必须配置一个系统温度τ，它是系统随机行动的可能性。该系统目前有两个选项：打Ace或打King。根据过往经验，打Ace成功的概率是80％，打King成功的概率是20％。我们将温度τ配置为2。 ​		那么在这一轮中，模型打Ace的概率是： ​		这意味着尽管该模型目前有80％的把握确定打Ace是正确的策略，但只有57％的可能性使用该策略。这是因为在强化学习中，我们为探索（测试新策略）和开发（使用已知策略）均分配了价值。如果我们提高温度，则该模型将变得“更具冲动性”：更有可能探索新策略，而不是使用最有可能获胜的策略。 声明：图文，案例均来自参考，本篇仅是翻译和摘要。 参考： [1] Thomas Wood，Softmax Function Definition, DeepAI ​ "
    }, {
    "id": 11,
    "url": "https://chaos-gravity.github.io/HelloWorld/",
    "title": "Hello, World!",
    "body": "2020/02/22 - 现在是2020年2月22日，总觉得该做点什么。 不如敲行python代码吧！ print( Hello, World! )来日方长，请多关照！ "
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><span class='body'>"+ body +"</span><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}

function lunr_search(term) {
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-primary btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><small><span class='body'>"+ body +"</span><span class='url'>"+ url +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Sorry, no results found. Close & try a different search!</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});