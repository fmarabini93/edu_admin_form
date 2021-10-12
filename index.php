            <?php
                  include "db/create_db.php";
                  include "db/db_connection.php";
            ?>
            <iframe id="myIframe" name="myIframe" width="0" height="0" frameborder="0"></iframe>
            <form action="index.php" target="myIframe" method="post">
                  <select name="category" id="category" class="form-control w-75 shadow-none">
                        <?php
                              $categories = [];
                              $sql = "SELECT * FROM categories";
                              $result = mysqli_query($conn, $sql);
                              while($row = $result->fetch_assoc()) {
                                    $categories[] = $row['title'];
                              };
                              foreach($categories as $category) {
                                    echo "<option value='$category'>$category</option>";
                              }
                        ?>
                  </select>
                  <input type="submit" value="Go"/>
            </form>
            <select name="question" class="form-control w-75 shadow-none">
                  <?php
                        var_dump($_REQUEST['category']);
                        if($_REQUEST['category'] == "Generalità") {
                              $questions = [];
                              $sql = "SELECT * FROM gen_questions";
                              $result = mysqli_query($conn, $sql);
                              while($row = $result->fetch_assoc()) {
                                    $questions[] = $row['title'];
                              };
                              echo "<option hidden value=''></option>";
                              foreach($gen_questions as $question) {
                                    echo "<option value='$question'>$question</option>";
                              }
                        } else if($_POST['category'] == "Interessi") {
                              $questions = [];
                              $sql = "SELECT * FROM int_questions";
                              $result = mysqli_query($conn, $sql);
                              while($row = $result->fetch_assoc()) {
                                    $questions[] = $row['title'];
                              };
                              echo "<option hidden value=''></option>";
                              foreach($gen_questions as $question) {
                                    echo "<option value='$question'>$question</option>";
                              }
                        } else {
                              $questions = [];
                              $sql = "SELECT * FROM school_questions";
                              $result = mysqli_query($conn, $sql);
                              while($row = $result->fetch_assoc()) {
                                    $questions[] = $row['title'];
                              };
                              echo "<option hidden value=''></option>";
                              foreach($gen_questions as $question) {
                                    echo "<option value='$question'>$question</option>";
                              }
                        }
                        ;
                  ?>
            </select>